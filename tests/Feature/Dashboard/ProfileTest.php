<?php

namespace Tests\Feature\Dashboard;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProfileTest extends TestCase
{
    use RefreshDatabase;

    public function test_profile_page_is_not_displayed_for_users(): void
    {
        $user = User::factory()->user()->create();

        $this->actingAs($user);

        $this->get('/dashboard/profile')->assertForbidden();
        $this->get('/dashboard/profile/edit')->assertForbidden();
    }

    public function test_profile_page_is_displayed_for_admins(): void
    {
        $user = User::factory()->admin()->create();

        $response = $this
            ->actingAs($user)
            ->get('/dashboard/profile');

        $response->assertOk();
    }

    public function test_edit_profile_page_is_displayed(): void
    {
        $user = User::factory()->admin()->create();

        $response = $this
            ->actingAs($user)
            ->get('/dashboard/profile/edit');

        $response->assertOk();
    }

    public function test_profile_information_can_be_updated(): void
    {
        $user = User::factory()->admin()->create();

        $response = $this
            ->actingAs($user)
            ->patch('/dashboard/profile', [
                'name' => 'Test User',
                'email' => 'test@example.com',
                'phone' => '555555554',
                'phone_country' => 'SA',
            ]);

        $response
            ->assertSessionHasNoErrors()
            ->assertRedirect('/dashboard/profile/edit');

        $user->refresh();

        $this->assertSame('Test User', $user->name);
        $this->assertSame('test@example.com', $user->email);
        $this->assertSame('+966555555554', (string) $user->phone);
        $this->assertNull($user->email_verified_at);
    }

    public function test_email_verification_status_is_unchanged_when_the_email_address_is_unchanged(): void
    {
        $user = User::factory()->admin()->create();

        $response = $this
            ->actingAs($user)
            ->patch('/dashboard/profile', [
                'name' => 'Test User',
                'email' => $user->email,
                'phone' => '555555554',
                'phone_country' => 'SA',
            ]);

        $response
            ->assertSessionHasNoErrors()
            ->assertRedirect('/dashboard/profile/edit');

        $this->assertNotNull($user->refresh()->email_verified_at);
    }

    public function test_user_can_delete_their_account(): void
    {
        $user = User::factory()->admin()->create();

        $response = $this
            ->actingAs($user)
            ->delete('/dashboard/profile', [
                'password' => 'password',
            ]);

        $response
            ->assertSessionHasNoErrors()
            ->assertRedirect('/');

        $this->assertGuest();
        $this->assertNull($user->fresh());
    }

    public function test_correct_password_must_be_provided_to_delete_account(): void
    {
        $user = User::factory()->admin()->create();

        $response = $this
            ->actingAs($user)
            ->from('/dashboard/profile')
            ->delete('/dashboard/profile', [
                'password' => 'wrong-password',
            ]);

        $response
            ->assertSessionHasErrorsIn('userDeletion', 'password')
            ->assertRedirect('/dashboard/profile');

        $this->assertNotNull($user->fresh());
    }
}
