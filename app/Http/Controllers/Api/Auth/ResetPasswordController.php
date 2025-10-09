<?php

namespace App\Http\Controllers\Api\Auth;

use App\Exceptions\Auth\InvalidDataException;
use App\Exceptions\Auth\InvalidOtpException;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Auth\Register\ResendOtpRequest;
use App\Http\Requests\Api\Auth\Register\ResetPasswordRequest;
use App\Http\Requests\Api\Auth\Register\ResetPasswordVerifyRequest;
use App\Http\Resources\UserResource;
use App\Services\ResetPasswordService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Validation\ValidationException;

/**
 * @group Auth
 *
 * @subgroup Reset Password
 */
class ResetPasswordController extends Controller
{
    public function __construct(
        protected ResetPasswordService $service
    ) {}

    /**
     * Send Reset Password OTP
     *
     * In this endpoint, We receive the phone number from request,
     * And generate an OTP with 10 minutes expiration
     * and send it as an SMS to the user's phone number,
     * Then we encrypt the password and OTP to be a token
     * and return it with the response.
     * <aside>You should save the token in your storage to pass it with OTP in the next endpoint.</aside>
     *
     * @responseFile 200 scenario="OTP Response" storage/docs/responses/auth/otp.json
     */
    public function sendOtp(ResetPasswordRequest $request): JsonResponse
    {
        if (RateLimiter::tooManyAttempts($rateLimitKey = 'send-OTP:'.$request->ip(), 1)) {
            $seconds = RateLimiter::availableIn($rateLimitKey);

            throw ValidationException::withMessages([
                'resend' => [__('auth.verify.validation.otp.rate-limit', ['seconds' => $seconds])],
            ]);
        }

        $otp = $this->service->sendOTP(
            data: [
                'phone' => $request->phone('phone'),
            ],
            notifiable: [
                'phone' => $request->phone('phone'),
            ]
        );

        RateLimiter::increment($rateLimitKey);

        return response()->json([
            'data' => [
                'message' => __('auth.verify.messages.sent'),
                'token' => $otp->getToken(),
            ],
        ]);
    }

    /**
     * Resend OTP
     *
     * Resend the OTP to user's phone number.
     *
     * @responseFile 200 scenario="OTP Response" storage/docs/responses/auth/otp.json
     */
    public function resendOtp(ResendOtpRequest $request): JsonResponse
    {
        if (RateLimiter::tooManyAttempts($rateLimitKey = 'send-OTP:'.$request->ip(), 1)) {
            $seconds = RateLimiter::availableIn($rateLimitKey);

            throw ValidationException::withMessages([
                'resend' => [__('auth.verify.validation.otp.rate-limit', ['seconds' => $seconds])],
            ]);
        }

        $otp = $this->service->resendOTP($request->input('token'));

        RateLimiter::increment($rateLimitKey);

        return response()->json([
            'data' => [
                'message' => __('auth.verify.messages.resent'),
                'token' => $otp->getToken(),
            ],
        ]);
    }

    /**
     * Reset Password
     *
     * In this endpoint, We pass the encrypted token from the previous API,
     * And the OTP that sent to the phone number.
     * and ensure if the OTP is valid, Decrypt the token
     * and reset the user's password.
     *
     * @responseFile 200 scenario="Reset Password Response" storage/docs/responses/auth/reset.json
     */
    public function verify(ResetPasswordVerifyRequest $request): UserResource
    {
        try {
            $user = $this->service->reset(
                otp: $request->input('otp'),
                token: $request->input('token'),
                password: Hash::make($request->input('password'))
            );

            return (new UserResource($user))
                ->additional([
                    'access_token' => $user->createToken(
                        $request->header('user-agent')
                    )->plainTextToken,
                ]);
        } catch (InvalidDataException $exception) {
            throw ValidationException::withMessages($exception->getErrors());
        } catch (InvalidOtpException $exception) {
            throw ValidationException::withMessages([
                'otp' => [__('validation.exists', ['attribute' => 'otp'])],
            ]);
        }
    }
}
