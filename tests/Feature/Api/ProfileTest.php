<?php

namespace Tests\Feature\Api;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProfileTest extends TestCase
{
    use RefreshDatabase;

    public function test_the_authenticated_user_can_access_his_profile(): void
    {
        $user = User::factory([
            'name' => 'Test User',
            'phone' => '+966551589656',
            'email' => 'user@demo.com',
        ])->create();

        $this->actingAs($user);

        $response = $this->getJson('/api/profile');

        $response->assertSuccessful();

        $response->assertJsonPath('data.name', 'Test User');
        $response->assertJsonPath('data.phone', '+966551589656');
        $response->assertJsonPath('data.email', 'user@demo.com');
    }

    public function test_the_guest_user_cannot_access_his_profile(): void
    {
        User::factory()->create();

        $response = $this->getJson('/api/profile');

        $response->assertUnauthorized();
    }

    public function test_profile_information_can_be_updated(): void
    {
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->postJson('/api/profile', [
                'name' => 'Test User',
                'email' => 'test@example.com',
                'phone' => '+966555555554',
            ]);

        $response->assertSuccessful();

        $response->assertJsonPath('data.name', 'Test User');
        $response->assertJsonPath('data.phone', '+966555555554');
        $response->assertJsonPath('data.email', 'test@example.com');

        $user->refresh();

        $this->assertNull($user->email_verified_at);
    }

    public function test_email_verification_status_is_unchanged_when_the_email_address_is_unchanged(): void
    {
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->postJson('/api/profile', [
                'name' => 'Test User',
                'email' => $user->email,
                'phone' => '+966555555554',
            ]);

        $response->assertSuccessful();

        $response->assertJsonPath('data.name', 'Test User');
        $response->assertJsonPath('data.phone', '+966555555554');
        $response->assertJsonPath('data.email', $user->email);

        $this->assertNotNull($user->refresh()->email_verified_at);
    }
}
