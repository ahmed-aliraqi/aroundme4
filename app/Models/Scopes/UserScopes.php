<?php

namespace App\Models\Scopes;

use Illuminate\Database\Eloquent\Builder;

/**
 * @method static Builder whereUsername(string $username)
 */
trait UserScopes
{
    /**
     * Scope the query to include the user of the given email or phone number.
     */
    public function scopeWhereUsername(Builder $builder, string $username): Builder
    {
        return $builder->where(function (Builder $builder) use ($username) {
            $builder->where('email', $username);

            if (phone($username)->isValid()) {
                $username = phone($username)->formatE164();
            }

            $builder->orWhere('phone', $username);
        });
    }
}
