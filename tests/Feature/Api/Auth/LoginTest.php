<?php

namespace Tests\Feature\Api\Auth;

use App\Models\User;
use Illuminate\Auth\Events\Login;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class LoginTest extends TestCase
{
    use RefreshDatabase;

    public function test_the_user_can_log_in_with_valid_credentials(): void
    {
        Event::fake();

        $user = User::factory([
            'email' => 'user@demo.com',
            'phone' => '+966502944098',
            'password' => Hash::make('password'),
        ])->create();

        foreach (['user@demo.com', '+966502944098'] as $username) {
            $response = $this->postJson('/api/login', [
                'username' => $username,
                'password' => 'password',
            ]);

            $response->assertSuccessful();

            $response->assertJsonStructure(['data', 'access_token']);

            $response->assertJsonPath('data.id', $user->id);

            Event::assertDispatched(Login::class);
        }
    }

    public function test_the_user_cannot_log_in_with_invalid_credentials(): void
    {
        Event::fake();

        User::factory([
            'email' => 'user@demo.com',
            'password' => Hash::make('password'),
        ])->create();

        $response = $this->postJson('/api/login', [
            'username' => 'invalid@demo.com',
            'password' => 'password',
        ]);

        $response->assertUnprocessable();

        Event::assertNotDispatched(Login::class);
    }
}
