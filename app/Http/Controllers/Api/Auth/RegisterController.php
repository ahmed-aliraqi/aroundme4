<?php

namespace App\Http\Controllers\Api\Auth;

use App\Enums\UserType;
use App\Exceptions\Auth\InvalidDataException;
use App\Exceptions\Auth\InvalidOtpException;
use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Auth\Register\RegisterRequest;
use App\Http\Requests\Api\Auth\Register\ResendOtpRequest;
use App\Http\Requests\Api\Auth\Register\VerifyRequest;
use App\Http\Resources\UserResource;
use App\Services\RegisterService;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Validation\ValidationException;

/**
 * @group Auth
 *
 * @subgroup Register
 */
class RegisterController extends Controller
{
    public function __construct(
        protected RegisterService $service
    ) {}

    /**
     * Send Register OTP
     *
     * In this endpoint, We receive the data from request,
     * And generate an OTP with 10 minutes expiration
     * and send it as an SMS to the registered phone number,
     * Then we encrypt the data and OTP to be a token
     * and return it with the response.
     * <aside>You should save the token in your storage to pass it with OTP in the next endpoint.</aside>
     *
     * @responseFile 200 scenario="OTP Response" storage/docs/responses/auth/otp.json
     */
    public function sendOtp(RegisterRequest $request): JsonResponse
    {
        if (RateLimiter::tooManyAttempts($rateLimitKey = 'send-OTP:'.$request->ip(), 1)) {
            $seconds = RateLimiter::availableIn($rateLimitKey);

            throw ValidationException::withMessages([
                'resend' => [__('auth.verify.validation.otp.rate-limit', ['seconds' => $seconds])],
            ]);
        }

        $otp = $this->service->sendOTP(
            data: [
                'name' => $request->name,
                'email' => $request->email,
                'phone' => $request->phone('phone'),
                'type' => UserType::USER->value,
                'password' => Hash::make($request->password),
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
     * Register
     *
     * In this endpoint, We pass the encrypted token from the previous API,
     * And the OTP that sent to the phone number.
     * and ensure if the OTP is valid, Decrypt the token
     * and register the user's data.
     *
     * @responseFile 200 scenario="Register Response" storage/docs/responses/auth/reset.json
     */
    public function verify(VerifyRequest $request): UserResource
    {
        try {
            $user = $this->service->register(
                otp: $request->input('otp'),
                token: $request->input('token')
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
