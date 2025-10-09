<?php

namespace App\Enums;

enum UserType: string
{
    case ADMIN = 'ADMIN';
    case USER = 'USER';

    public function label(): string
    {
        return match ($this) {
            self::ADMIN => __('users.types.ADMIN'),
            self::USER => __('users.types.USER'),
        };
    }
}
