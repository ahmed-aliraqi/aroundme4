<?php

return [
    'title' => 'Settings',
    'note' => [
        'mail' => [
            'title' => 'Note',
            'body' => 'These credentials are only used for the SMTP mailer.',
        ],
    ],
    'tabs' => [
        'main' => 'Main Settings',
        'mail' => 'Mail Credentials',
        'sms' => 'SMS Credentials',
    ],
    'actions' => [
        'save' => 'Save',
        'logo' => [
            'upload' => 'Upload Logo',
            'reset' => 'Reset',
        ],
        'favicon' => [
            'upload' => 'Upload Favicon',
            'reset' => 'Reset',
        ],
    ],
    'messages' => [
        'updated' => 'The application settings has been updated successfully.',
    ],
    'attributes' => [
        'APP_NAME' => 'App Name',
        '%APP_NAME%' => 'App Name',
        'APP_COPYRIGHT' => 'Copyright',
        '%APP_COPYRIGHT%' => 'Copyright',
        'APP_LOCALE' => 'Default Language',
        'LOGO' => 'Logo',
        'FAVICON' => 'Favicon',
        'MAIL_HOST' => 'Host',
        'MAIL_PORT' => 'Port',
        'MAIL_USERNAME' => 'Username',
        'MAIL_PASSWORD' => 'Password',
        'MAIL_FROM_NAME' => 'From Name',
        'MAIL_FROM_ADDRESS' => 'From Address',
        'SMS_ENABLED' => 'Enable SMS',
        'SMS_ENDPOINT' => 'Endpoint',
        'SMS_API_KEY' => 'Api Key',
    ],
    'notes' => [
        'LOGO' => 'Main logo for your site (PNG recommended)',
        'FAVICON' => 'Site icon for browser tab (32×32px)',
        'MAIL_PORT' => 'Enter a valid SMTP port number between (1 - 65535)',
    ],
];
