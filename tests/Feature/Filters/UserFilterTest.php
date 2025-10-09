<?php

namespace Tests\Feature\Filters;

use App\Enums\UserType;
use App\Http\Filters\UserFilter;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserFilterTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_can_filter_users_by_name()
    {
        User::query()->delete();

        User::factory()->create(['name' => 'John Doe']);
        User::factory()->create(['name' => 'Jane Smith']);
        User::factory()->create(['name' => 'Alice Johnson']);

        $this->assertSame(1, User::filter(new UserFilter(['name' => 'John Do']))->count());
        $this->assertSame(1, User::filter(new UserFilter(['name' => 'Jane']))->count());
        $this->assertSame(2, User::filter(new UserFilter(['name' => 'John']))->count());
    }

    public function test_it_can_filter_users_by_email()
    {
        User::query()->delete();

        User::factory()->create(['email' => 'john@example.com']);
        User::factory()->create(['email' => 'jane@example.com']);
        User::factory()->create(['email' => 'alice@example.com']);

        $this->assertSame(1, User::filter(new UserFilter(['email' => 'john']))->count());
        $this->assertSame(1, User::filter(new UserFilter(['email' => 'jane']))->count());
        $this->assertSame(3, User::filter(new UserFilter(['email' => '@example.com']))->count());
    }

    public function test_it_can_filter_users_by_phone()
    {
        User::query()->delete();

        User::factory()->create(['phone' => '+201098135318']);
        User::factory()->create(['phone' => '+966558024044']);
        User::factory()->create(['phone' => '+201512121212']);

        $filters = new UserFilter(['phone' => '2015']);
        $filteredUsers = User::filter($filters)->get();

        $this->assertCount(1, $filteredUsers);
        $this->assertEquals('+201512121212', $filteredUsers->first()->phone);
    }

    public function test_it_can_filter_users_by_type()
    {
        User::query()->delete();

        User::factory()->create(['type' => UserType::ADMIN]);
        User::factory()->create(['type' => UserType::USER]);
        User::factory()->create(['type' => UserType::USER]);

        $filters = new UserFilter(['type' => UserType::ADMIN->value]);

        $filteredUsers = User::filter($filters)->get();

        $this->assertCount(1, $filteredUsers);
        $this->assertEquals(UserType::ADMIN, $filteredUsers->first()->type);

        $filters = new UserFilter(['type' => '']);

        $filteredUsers = User::filter($filters)->get();

        $this->assertCount(3, $filteredUsers);
    }

    public function test_it_returns_all_users_when_no_filters_applied()
    {
        User::query()->delete();

        User::factory()->count(3)->create();

        $filters = new UserFilter;
        $users = User::filter($filters)->get();

        $this->assertCount(3, $users);
    }
}
