<?php

namespace Tests\Feature\Api\Auth;

use App\Enums\UserType;
use App\Models\User;
use App\Notifications\SmsNotification;
use App\Support\OTP;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Notifications\AnonymousNotifiable;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Str;
use Tests\TestCase;

class RegisterTest extends TestCase
{
    use RefreshDatabase;

    public function test_the_user_can_register_with_valid_data(): void
    {
        Notification::fake();

        $this->partialMock(OTP::class, function ($m) {
            /** @var \Mockery\Mock $m */
            $m->shouldReceive('getToken')->andReturn('123456789');
        });

        $response = $this->postJson('/api/register/otp/send', [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'phone' => '+966532161814',
            'type' => UserType::USER->value,
            'password' => 'password',
            'password_confirmation' => 'password',
        ]);

        $response->assertSuccessful();

        $response->assertJsonStructure(['data' => ['message', 'token']]);

        $response->assertJsonPath('data.token', '123456789');

        Notification::assertSentTo(new AnonymousNotifiable, SmsNotification::class);
    }

    public function test_the_user_can_resend_otp(): void
    {
        $this->travelTo(now()->subMinutes(11));

        Notification::fake();

        $otp = (new OTP)
            ->setData([
                'name' => 'Test User',
                'email' => 'test@example.com',
                'phone' => '+966532161814',
                'type' => UserType::USER->value,
                'password' => 'password',
                'password_confirmation' => 'password',
            ])
            ->generate();

        $response = $this->postJson('/api/register/otp/resend?token='.$otp->getToken());

        $response->assertSuccessful();

        $response->assertJsonStructure(['data' => ['message', 'token']]);

        Notification::assertSentTo(new AnonymousNotifiable, SmsNotification::class);
    }

    public function test_the_user_cannot_register_with_invalid_data(): void
    {
        $cases = [
            [
                'name' => '',
                'phone' => '',
                'email' => '',
                'type' => '',
                'password' => '',
                'password_confirmation' => '',
            ],
            [
                'name' => Str::random(256),
                'phone' => '41589656',
                'email' => 'invalid email',
                'type' => 'invalid',
                'password' => '',
                'password_confirmation' => 'password',
            ],
            [
                'name' => Str::random(256),
                'phone' => User::factory()->create()->phone,
                'email' => User::factory()->create()->email,
                'type' => 'invalid',
                'password' => '',
                'password_confirmation' => 'password',
            ],
        ];
        foreach ($cases as $data) {
            $response = $this->postJson('/api/register/otp/send?'.http_build_query($data));

            $response->assertUnprocessable();

            $response->assertJsonValidationErrorFor('name');
            $response->assertJsonValidationErrorFor('phone');
            $response->assertJsonValidationErrorFor('email');
            $response->assertJsonValidationErrorFor('password');
        }
    }

    public function test_it_cannot_verify_phone_and_store_user_data_with_invalid_token(): void
    {
        // Generate expired token
        $this->travelTo(now()->subMinutes(11));
        $otp = (new OTP)->setData([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'phone' => '+966532161814',
            'type' => UserType::USER->value,
            'password' => Hash::make('password'),
        ])->generate(1234);
        $this->travelBack();

        $otps = [
            [
                'token' => $otp->getToken(), // Expired
                'otp' => 1234,
            ],
            [
                'token' => 123456789, // Invalid
                'otp' => 1234,
            ],
            [
                'token' => 123456789, // Invalid
                'otp' => 12345, // Invalid
            ],
        ];

        foreach ($otps as $otp) {
            $response = $this->postJson('/api/register/verify?'.http_build_query([
                'token' => $otp['token'],
                'otp' => $otp['otp'],
            ]));

            $response->assertUnprocessable();
            $response->assertJsonValidationErrorFor('otp');
        }
    }

    public function test_it_can_verify_phone_and_store_user_data_with_valid_token(): void
    {
        $otp = (new OTP)->setData([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'phone' => '+966532161814',
            'type' => UserType::USER->value,
            'password' => Hash::make('password'),
        ])->generate(1234);

        $response = $this->postJson('/api/register/verify?'.http_build_query([
            'token' => $otp->getToken(),
            'otp' => 1234,
        ]));

        $response->assertSuccessful();

        $response->assertJsonStructure(['data', 'access_token']);
        $response->assertJsonPath('data.name', 'Test User');
        $response->assertJsonPath('data.phone', '+966532161814');
        $response->assertJsonPath('data.email', 'test@example.com');
    }

    public function test_the_user_can_resend_otp_via_api_once_per_minute(): void
    {
        $this->travelTo(now()->subMinutes(11));

        Notification::fake();

        $otp = (new OTP)
            ->setData([
                'name' => 'Test User',
                'email' => 'test@example.com',
                'phone' => '+966532161814',
                'type' => UserType::USER->value,
                'password' => Hash::make('password'),
            ])
            ->generate();

        $this->travelBack();

        $response = $this->post('/api/register/otp/resend?token='.$otp->getToken());

        $response->assertSuccessful();

        Notification::assertSentTo(new AnonymousNotifiable, SmsNotification::class);

        $otp = (new OTP)
            ->setData([
                'name' => 'Test User',
                'email' => 'test@example.com',
                'phone' => '+966532161814',
                'type' => UserType::USER->value,
                'password' => Hash::make('password'),
            ])
            ->generate();

        $response = $this->postJson('/api/register/otp/resend?token='.$otp->getToken());

        $response->assertJsonValidationErrors(['resend']);
    }
}
