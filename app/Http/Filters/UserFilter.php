<?php

namespace App\Http\Filters;

use AhmedAliraqi\LaravelFilterable\BaseFilter;
use App\Enums\UserType;

class UserFilter extends BaseFilter
{
    /**
     * Registered filters to operate upon.
     */
    protected array $filters = [
        'name',
        'email',
        'phone',
        'type',
    ];

    /**
     * Filter the query by the given name.
     */
    public function name(?string $value): void
    {
        $this->builder->where('name', 'like', "%$value%");
    }

    /**
     * Filter the query by the given email.
     */
    public function email(?string $value): void
    {
        $this->builder->where('email', 'like', "%$value%");
    }

    /**
     * Filter the query by the given phone.
     */
    public function phone(?string $value): void
    {
        $this->builder->where('phone', 'like', "%$value%");
    }

    /**
     * Filter the query by the given type.
     */
    public function type(?string $value): void
    {
        if (in_array($value, array_map(fn (UserType $type) => $type->value, UserType::cases()))) {
            $this->builder->where('type', $value);
        }
    }
}
