<?php

namespace Tests\Feature\Api\Auth;

use App\Models\User;
use App\Notifications\SmsNotification;
use App\Support\OTP;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Notifications\AnonymousNotifiable;
use Illuminate\Support\Facades\Notification;
use Tests\TestCase;

class PasswordResetTest extends TestCase
{
    use RefreshDatabase;

    public function test_the_user_can_reset_his_password(): void
    {
        User::factory()->create([
            'phone' => '+966532161814',
        ]);

        Notification::fake();

        $this->partialMock(OTP::class, function ($m) {
            /** @var \Mockery\Mock $m */
            $m->shouldReceive('getToken')->andReturn('123456789');
        });

        $response = $this->postJson('/api/password/otp/send', [
            'phone' => '+966532161814',
        ]);

        $response->assertSuccessful();

        $response->assertJsonStructure(['data' => ['message', 'token']]);

        $response->assertJsonPath('data.token', '123456789');

        Notification::assertSentTo(new AnonymousNotifiable, SmsNotification::class);
    }

    public function test_the_user_can_resend_password_reset_otp(): void
    {
        User::factory()->create([
            'phone' => '+966532161814',
        ]);

        $this->travelTo(now()->subMinutes(11));

        Notification::fake();

        $otp = (new OTP)
            ->setData([
                'phone' => '+966532161814',
            ])
            ->generate();

        $response = $this->postJson('/api/password/otp/resend?token='.$otp->getToken());

        $response->assertSuccessful();

        $response->assertJsonStructure(['data' => ['message', 'token']]);

        Notification::assertSentTo(new AnonymousNotifiable, SmsNotification::class);
    }

    public function test_the_user_cannot_reset_password_with_invalid_phone(): void
    {
        User::factory()->create([
            'phone' => '+966532161814',
        ]);

        $response = $this->postJson('/api/password/otp/send?phone=123456');

        $response->assertUnprocessable();
    }

    public function test_it_cannot_verify_phone_and_reset_password_with_invalid_token(): void
    {
        User::factory()->create([
            'phone' => '+966532161814',
        ]);

        // Generate expired token
        $this->travelTo(now()->subMinutes(11));
        $otp = (new OTP)->setData([
            'phone' => '+966532161814',
        ])->generate(1234);
        $this->travelBack();

        $otps = [
            [
                'token' => $otp->getToken(), // Expired
                'otp' => 1234,
                'password' => '',
                'password_confirmation' => '',
            ],
            [
                'token' => 123456789, // Invalid
                'otp' => 1234,
                'password' => 'newpassword',
                'password_confirmation' => 'newpassword',
            ],
            [
                'token' => 123456789, // Invalid
                'otp' => 12345, // Invalid
                'password' => 'newpassword',
                'password_confirmation' => 'password',
            ],
        ];

        foreach ($otps as $otp) {
            $response = $this->postJson('/api/password/verify?'.http_build_query([
                'token' => $otp['token'],
                'otp' => $otp['otp'],
            ]));

            $response->assertUnprocessable();
            $response->assertJsonValidationErrorFor('password');
        }
    }

    public function test_it_can_verify_phone_and_reset_password_with_valid_token(): void
    {
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'phone' => '+966532161814',
        ]);

        $otp = (new OTP)->setData([
            'phone' => '+966532161814',
        ])->generate(1234);

        $response = $this->postJson('/api/password/verify?'.http_build_query([
            'token' => $otp->getToken(),
            'otp' => 1234,
            'password' => 'newpassword',
            'password_confirmation' => 'newpassword',
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
                'phone' => '+966532161814',
            ])
            ->generate();

        $this->travelBack();

        $response = $this->post('/api/password/otp/resend?token='.$otp->getToken());

        $response->assertSuccessful();

        Notification::assertSentTo(new AnonymousNotifiable, SmsNotification::class);

        $otp = (new OTP)
            ->setData([
                'phone' => '+966532161814',
            ])
            ->generate();

        $response = $this->postJson('/api/password/otp/resend?token='.$otp->getToken());

        $response->assertJsonValidationErrors(['resend']);
    }
}
