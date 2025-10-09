<?php

namespace App\Services;

use App\Exceptions\Auth\InvalidDataException;
use App\Exceptions\Auth\InvalidOtpException;
use App\Models\User;
use App\Notifications\Channels\SmsChannel;
use App\Notifications\SmsNotification;
use App\Support\OTP;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Validator;

class ResetPasswordService
{
    public function sendOTP(array $data, array $notifiable): OTP
    {
        $notifiablePhoneNumber = data_get($notifiable, 'phone');

        $code = rand(1000, 9999);

        if (in_array($notifiablePhoneNumber, config('otp.test_phones'))) {
            $code = 1234;
        }

        $otp = $this->otp()->setData($data)->generate(otp: $code);

        Notification::route(SmsChannel::class, $notifiable)
            ->notify(
                new SmsNotification(
                    message: __('auth.reset_password.notifications.otp', [
                        'app' => app_name(),
                        'code' => $otp->getOtp(),
                        'expireAt' => $otp->getExpirationDate(),
                    ])
                )
            );

        return $otp;
    }

    public function resendOTP(string $token): OTP
    {
        $otp = $this->otp()->decryptToken($token);

        $data = $otp->getData();

        $otp = $otp->setData($data)->generate($otp->getOtp());

        Notification::route(SmsChannel::class, ['phone' => data_get($otp->getData(), 'phone')])
            ->notify(
                new SmsNotification(
                    message: __('auth.reset_password.notifications.otp', [
                        'app' => app_name(),
                        'code' => $otp->getOtp(),
                        'expireAt' => $otp->getExpirationDate(),
                    ])
                )
            );

        return $otp;
    }

    public function reset(mixed $otp, string $token, mixed $password)
    {
        // Validate the OTP with the token.
        $otp = $this->otp()->validate(
            token: $token,
            otp: $otp
        );

        if ($otp->isValid()) {
            // If the OTP & token is valid,
            $validator = $this->validateOtpData(data: $otp->getData());

            if ($validator->fails()) {
                // The email or phone number is unavailable.
                throw (new InvalidDataException)
                    ->setData(
                        data: $otp->getData()
                    )
                    ->setErrorMessages(
                        messages: [
                            'phone' => [$validator->errors()->first('phone')],
                        ]
                    );
            }

            $user = User::where('phone', data_get($otp->getData(), 'phone'))->first();

            $user->update(['password' => $password]);

            event(new PasswordReset($user));

            Auth::login($user);

            return $user;
        }

        throw new InvalidOtpException;
    }

    public function validateOTP(string $token): OTP
    {
        $otp = $this->otp()->decryptToken($token);

        $validator = $this->validateOtpData(data: $otp->getData());

        if ($otp->isValid()) {
            if (! empty($otp->getData())
                && $validator->passes()
                && ! $otp->expired()) {
                return $otp;
            }

            $errorMessages = [];

            if ($error = $validator->errors()->first('phone')) {
                $errorMessages['phone'] = $error;
            }

            throw (new InvalidDataException)
                ->setData(
                    data: $otp->getData()
                )
                ->setErrorMessages(
                    messages: $errorMessages
                );
        }

        throw new InvalidOtpException;
    }

    protected function validateOtpData(array $data): \Illuminate\Validation\Validator
    {
        return Validator::make($data, [
            'phone' => ['required', 'phone' => ['required']],
        ], [], Arr::dot(__('auth.reset_password.attributes')));
    }

    protected function otp(): OTP
    {
        return app(OTP::class);
    }
}
