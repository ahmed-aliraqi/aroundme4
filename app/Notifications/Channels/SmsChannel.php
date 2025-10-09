<?php

namespace App\Notifications\Channels;

use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class SmsChannel
{
    /**
     * Send the given notification.
     */
    public function send(object $notifiable, Notification $notification): void
    {
        $phone = data_get($notifiable->routeNotificationFor(self::class), 'phone');

        if (! method_exists($notification, 'toSms')) {
            return;
        }

        if (in_array($phone, config('otp.test_phones'))) {
            return;
        }

        $message = $notification->toSms($notifiable);

        if (! config('sms.enabled')) {
            if (! app()->isProduction()) {
                Log::channel('otp')->info($message);
            }

            return;
        }

        $endpoint = config('sms.endpoint');
        $apiKey = config('sms.api_key');

        $payload = [
            'api_key' => $apiKey,
            'mobile' => $phone,
            'message' => $message,
        ];

        $response = Http::post($endpoint, $payload);

        if ($response->failed()) {
            Log::error('SMS not sent', [
                'payload' => [
                    'url' => $endpoint,
                    'data' => $payload,
                ],
                'response' => $response->json(),
            ]);

            return;
        }

        Log::channel('otp')->info('SMS sent', [
            'mobile' => $phone,
            'message' => $message,
        ]);
    }
}
