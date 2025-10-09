<?php

return [
    /*
    |--------------------------------------------------------------------------
    | SMS Service Status
    |--------------------------------------------------------------------------
    |
    | Enable or disable the SMS service functionality across the application.
    | When set to false, no SMS messages will be sent.
    |
    */
    'enabled' => env('SMS_ENABLED', false),

    /*
    |--------------------------------------------------------------------------
    | SMS Provider Endpoint
    |--------------------------------------------------------------------------
    |
    | The base URL endpoint for your SMS service provider's API.
    | This is where all SMS requests will be sent.
    |
    */
    'endpoint' => env('SMS_ENDPOINT'),

    /*
    |--------------------------------------------------------------------------
    | SMS Provider API Key
    |--------------------------------------------------------------------------
    |
    | Your authentication key for the SMS service provider.
    | Keep this value secure and never expose it in public repositories.
    |
    */
    'api_key' => env('SMS_API_KEY'),
];
