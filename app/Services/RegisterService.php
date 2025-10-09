<?php

namespace App\Services;

use App\Exceptions\Auth\InvalidDataException;
use App\Exceptions\Auth\InvalidOtpException;
use App\Models\User;
use App\Notifications\Channels\SmsChannel;
use App\Notifications\SmsNotification;
use App\Support\OTP;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Laraeast\LaravelBootstrapForms\Rules\PhoneNumber;

class RegisterService
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
                    message: __('auth.verify.notification.otp', [
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
                    message: __('auth.verify.notification.otp', [
                        'app' => app_name(),
                        'code' => $otp->getOtp(),
                        'expireAt' => $otp->getExpirationDate(),
                    ])
                )
            );

        return $otp;
    }

    /**
     * @throws \App\Exceptions\Auth\InvalidOtpException
     * @throws \App\Exceptions\Auth\InvalidDataException
     */
    public function register(mixed $otp, string $token): User
    {
        // Validate the OTP with the token.
        $otp = $this->otp()->validate(
            token: $token,
            otp: $otp
        );

        if ($otp->isValid()) {

            // If the OTP & token is valid,
            // Double check if email or phone is still available.
            $validator = $this->validateOtpData(data: $otp->getData());

            if ($validator->fails()) {
                // The email or phone number is unavailable.
                throw (new InvalidDataException)
                    ->setData(
                        data: $otp->getData()
                    )
                    ->setErrorMessages(
                        messages: [
                            'email' => [$validator->errors()->first('email')],
                            'phone' => [$validator->errors()->first('phone')],
                        ]
                    );
            }

            // If everything is passed, Create the user and redirect to dashboard.
            $user = User::create([
                ...$otp->getData(),
            ]);

            event(new Registered($user));

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

            if ($error = $validator->errors()->first('email')) {
                $errorMessages['email'] = $error;
            }
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
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique(User::class, 'email')],
            'phone' => ['required', new PhoneNumber, Rule::unique(User::class, 'phone')],
        ], [], Arr::dot(__('auth.register.attributes')));
    }

    protected function otp(): OTP
    {
        return app(OTP::class);
    }
}
