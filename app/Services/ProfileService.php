<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class ProfileService
{
    /**
     * Update the user's profile.
     */
    public function updateUser(User $user, array $data): User
    {
        DB::beginTransaction();

        $user->fill($data);

        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }

        $user->save();

        if ($avatar = data_get($data, 'avatar')) {
            $user
                ->addMediaFromBase64($avatar)
                ->usingName('avatar')
                ->usingFileName('avatar.png')
                ->toMediaCollection('avatars');
        }

        DB::commit();

        return $user->refresh();
    }

    /**
     * Change the user's password.
     */
    public function changePassword(User $user, string $password): User
    {
        $user->update([
            'password' => Hash::make($password),
        ]);

        return $user;
    }

    /**
     * Delete the user's account.
     */
    public function destroyAccount(User $user): void
    {
        $user->delete();
    }
}
