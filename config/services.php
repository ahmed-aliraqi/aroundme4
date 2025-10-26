<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, Postmark, AWS and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'postmark' => [
        'token' => env('POSTMARK_TOKEN'),
    ],

    'resend' => [
        'key' => env('RESEND_KEY'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

    'slack' => [
        'notifications' => [
            'bot_user_oauth_token' => env('SLACK_BOT_USER_OAUTH_TOKEN'),
            'channel' => env('SLACK_BOT_USER_DEFAULT_CHANNEL'),
        ],
    ],

    'maps' => [
        'key' => env('MAPS_KEY'),
        'reverse_geocoding_external_api' => env(
            'MAPS_REVERSE_GEOCODING_EXTERNAL_API',
            'https://api2.thtc.ae/api/mt/map/?lang=ar&cnt=ksa&ser=1&tkey=API_KEY&q=traffic'
        ),
        'style' => env('MAPS_STYLE', 'https://ksamaps.com/api/style?lang=ar&key='.env('MAPS_KEY')),
        'geo_search' => env('MAPS_GEO_SEARCH', 'https://ksamaps.com/api/geosearch?key='.env('MAPS_KEY')),
    ],
];
