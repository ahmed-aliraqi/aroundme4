<?php

namespace Tests\Feature\Dashboard;

use App\Models\User;
use App\Providers\SettingsServiceProvider;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Laraeast\LaravelSettings\Facades\Settings;
use Tests\TestCase;

class SettingsTest extends TestCase
{
    use RefreshDatabase;

    public function test_settings_with_wrong_tab_name_redirect_to_main(): void
    {
        $this->actingAs(User::factory()->admin()->create());

        foreach (['', Str::random(5)] as $tab) {
            $this->get('/dashboard/settings/')->assertRedirect('/dashboard/settings/main');
        }
    }

    public function test_main_settings_tab_is_displayed(): void
    {
        $this->actingAs(User::factory()->admin()->create());

        $this->get('/dashboard/settings/main')->assertOk();
    }

    public function test_mail_settings_tab_is_displayed(): void
    {
        $this->actingAs(User::factory()->admin()->create());

        $this->get('/dashboard/settings/mail')->assertOk();
    }

    public function test_sms_settings_tab_is_displayed(): void
    {
        $this->actingAs(User::factory()->admin()->create());

        $this->get('/dashboard/settings/sms')->assertOk();
    }

    public function test_main_settings_validation(): void
    {
        $this->actingAs(User::factory()->admin()->create());

        $invalidCases = [
            [
                'APP_NAME:en' => '',
                'APP_NAME:ar' => '',
                'APP_COPYRIGHT:en' => '',
                'APP_COPYRIGHT:ar' => '',
                'APP_LOCALE' => '',
                'LOGO' => Str::random(30),
                'FAVICON' => Str::random(30),
            ],
            [
                'APP_NAME:en' => Str::random(256),
                'APP_NAME:ar' => Str::random(256),
                'APP_COPYRIGHT:en' => Str::random(256),
                'APP_COPYRIGHT:ar' => Str::random(256),
                'APP_LOCALE' => 'fr',
                'LOGO' => Str::random(30),
                'FAVICON' => Str::random(30),
            ],
        ];

        foreach ($invalidCases as $data) {
            $this->put('/dashboard/settings', $data)
                ->assertRedirect()
                ->assertSessionHasErrors([
                    'APP_NAME:en',
                    'APP_NAME:ar',
                    'APP_COPYRIGHT:en',
                    'APP_COPYRIGHT:ar',
                    'APP_LOCALE',
                    'LOGO',
                    'FAVICON',
                ]);
        }
    }

    public function test_main_settings_can_be_updated(): void
    {
        $this->actingAs(User::factory()->admin()->create());

        Storage::fake('public');

        $this->assertSame('Laravel', app_name());
        $this->assertSame('en', config('app.locale'));

        $this->assertDatabaseMissing('media', ['collection_name' => 'LOGO']);
        $this->assertDatabaseMissing('media', ['collection_name' => 'FAVICON']);

        $this->put('/dashboard/settings', [
            'APP_NAME:en' => 'Test App',
            'APP_NAME:ar' => 'Test App (AR)',
            'APP_COPYRIGHT:en' => 'All rights reserved',
            'APP_COPYRIGHT:ar' => 'All rights reserved (AR)',
            'APP_LOCALE' => 'ar',
            'LOGO' => 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAQSURBVHjaYvj//z8DQIABAAj8Av7bok0WAAAAAElFTkSuQmCC',
            'FAVICON' => 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAQSURBVHjaYvj//z8DQIABAAj8Av7bok0WAAAAAElFTkSuQmCC',
        ])->assertRedirect();

        $this->assertNotNull(Settings::instance('LOGO'));

        $this->assertSame('en', config('app.locale'));

        $this->assertSame('Test App', app_name());
        $this->assertSame('All rights reserved', app_copyright());

        app()->setLocale('ar');

        $this->assertSame('Test App (AR)', app_name());
        $this->assertSame('All rights reserved (AR)', app_copyright());

        $this->assertDatabaseHas('media', ['collection_name' => 'LOGO']);
        $this->assertDatabaseHas('media', ['collection_name' => 'FAVICON']);
    }

    public function test_mail_settings_validation(): void
    {
        $this->actingAs(User::factory()->admin()->create());

        $invalidCases = [
            [
                'MAIL_HOST' => '',
                'MAIL_PORT' => '',
                'MAIL_USERNAME' => '',
                'MAIL_PASSWORD' => '',
                'MAIL_FROM_NAME' => '',
                'MAIL_FROM_ADDRESS' => '',
            ],
            [
                'MAIL_HOST' => Str::random(256),
                'MAIL_PORT' => 'string',
                'MAIL_USERNAME' => Str::random(256),
                'MAIL_PASSWORD' => Str::random(256),
                'MAIL_FROM_NAME' => Str::random(256),
                'MAIL_FROM_ADDRESS' => Str::random(256),
            ],
            [
                'MAIL_HOST' => Str::random(256),
                'MAIL_PORT' => 65536,
                'MAIL_USERNAME' => Str::random(256),
                'MAIL_PASSWORD' => Str::random(256),
                'MAIL_FROM_NAME' => Str::random(256),
                'MAIL_FROM_ADDRESS' => Str::random(256),
            ],
        ];

        foreach ($invalidCases as $data) {
            $this->put('/dashboard/settings', $data)
                ->assertRedirect()
                ->assertSessionHasErrors([
                    'MAIL_HOST',
                    'MAIL_PORT',
                    'MAIL_USERNAME',
                    'MAIL_PASSWORD',
                    'MAIL_FROM_NAME',
                    'MAIL_FROM_ADDRESS',
                ]);
        }
    }

    public function test_mail_settings_can_be_updated(): void
    {
        $this->actingAs(User::factory()->admin()->create());

        $this->assertNotSame('smtp.example.com', config('mail.mailers.smtp.host'));
        $this->assertNotSame('8080', config('mail.mailers.smtp.port'));
        $this->assertNotSame('john due', config('mail.mailers.smtp.username'));
        $this->assertNotSame('123456789', config('mail.mailers.smtp.password'));
        $this->assertNotSame('john due', config('mail.from.name'));
        $this->assertNotSame('john@example.com', config('mail.from.address'));

        $this->put('/dashboard/settings', [
            'MAIL_HOST' => 'smtp.example.com',
            'MAIL_PORT' => '8080',
            'MAIL_USERNAME' => 'john due',
            'MAIL_PASSWORD' => '123456789',
            'MAIL_FROM_NAME' => 'john due',
            'MAIL_FROM_ADDRESS' => 'john@example.com',
        ])->assertRedirect();

        app()->booted(function () {
            (new SettingsServiceProvider(app()))->boot();
        });

        $this->assertSame('smtp.example.com', config('mail.mailers.smtp.host'));
        $this->assertSame('8080', config('mail.mailers.smtp.port'));
        $this->assertSame('john due', config('mail.mailers.smtp.username'));
        $this->assertSame('123456789', config('mail.mailers.smtp.password'));
        $this->assertSame('john due', config('mail.from.name'));
        $this->assertSame('john@example.com', config('mail.from.address'));
    }

    public function test_sms_settings_validation(): void
    {
        $this->actingAs(User::factory()->admin()->create());

        $invalidCases = [
            [
                'SMS_ENABLED' => '',
                'SMS_ENDPOINT' => '',
                'SMS_API_KEY' => '',
            ],
            [
                'SMS_ENABLED' => 'string',
                'SMS_ENDPOINT' => 123456,
                'SMS_API_KEY' => '',
            ],
        ];

        foreach ($invalidCases as $data) {
            $this->put('/dashboard/settings', $data)
                ->assertRedirect()
                ->assertSessionHasErrors([
                    'SMS_ENABLED',
                    'SMS_ENDPOINT',
                    'SMS_API_KEY',
                ]);
        }
    }

    public function test_sms_settings_can_be_updated(): void
    {
        $this->actingAs(User::factory()->admin()->create());

        $this->assertNotSame(true, config('sms.enabled'));
        $this->assertNotSame('https://example.com', config('sms.endpoint'));
        $this->assertNotSame('123456789', config('sms.api_key'));

        $this->put('/dashboard/settings', [
            'SMS_ENABLED' => '1',
            'SMS_ENDPOINT' => 'https://example.com',
            'SMS_API_KEY' => '123456789',
        ])->assertRedirect();

        app()->booted(function () {
            (new SettingsServiceProvider(app()))->boot();
        });

        $this->assertSame(true, config('sms.enabled'));
        $this->assertSame('https://example.com', config('sms.endpoint'));
        $this->assertSame('123456789', config('sms.api_key'));
    }
}
