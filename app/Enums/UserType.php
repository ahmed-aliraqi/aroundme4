<?php

namespace App\Enums;

enum UserType: string
{
    case ADMIN = 'ADMIN';
    case USER = 'USER';
    case APP_USER = 'APP_USER';

    public function label(): string
    {
        return match ($this) {
            self::ADMIN => __('users.types.ADMIN'),
            self::USER => __('users.types.USER'),
            self::APP_USER => __('users.types.APP_USER'),
        };
    }
}
