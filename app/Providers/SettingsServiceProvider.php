<?php

namespace App\Providers;

use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\ServiceProvider;
use Laraeast\LaravelSettings\Facades\Settings;

class SettingsServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        if (! Schema::hasTable('settings')) {
            return;
        }

        Config::set([
            'app.locale' => Settings::get('APP_LOCALE', config('app.locale')),

            // Mail Credentials
            'mail.mailers.smtp.host' => Settings::get('MAIL_HOST', config('mail.mailers.smtp.host')),
            'mail.mailers.smtp.port' => Settings::get('MAIL_PORT', config('mail.mailers.smtp.port')),
            'mail.mailers.smtp.username' => Settings::get('MAIL_USERNAME', config('mail.mailers.smtp.username')),
            'mail.mailers.smtp.password' => Settings::get('MAIL_PASSWORD', config('mail.mailers.smtp.password')),
            'mail.from.address' => Settings::get('MAIL_FROM_ADDRESS', config('mail.from.address')),
            'mail.from.name' => Settings::get('MAIL_FROM_NAME', config('mail.from.name')),

            // SMS Credentials
            'sms.enabled' => (bool) Settings::get('SMS_ENABLED', config('sms.enabled')),
            'sms.endpoint' => Settings::get('SMS_ENDPOINT', config('sms.endpoint')),
            'sms.api_key' => Settings::get('SMS_API_KEY', config('sms.api_key')),
        ]);
    }
}
