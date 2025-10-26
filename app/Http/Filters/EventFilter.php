<?php

namespace App\Http\Filters;

use AhmedAliraqi\LaravelFilterable\BaseFilter;
use App\Enums\UserType;
use Illuminate\Database\Eloquent\Builder;

class EventFilter extends BaseFilter
{
    /**
     * Registered filters to operate upon.
     */
    protected array $filters = [
        'q',
        'name',
        'email',
        'phone',
        'type',
    ];

    /**
     * Filter the query using the given value.
     */
    public function q(?string $value): void
    {
        $this->builder->where(function (Builder $builder) use ($value) {
            $builder->where('name', 'like', '%' . $value . '%');
            $builder->orWhere('email', 'like', '%' . $value . '%');
            $builder->orWhere('phone', 'like', '%' . $value . '%');
        });
    }
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
    public function type(string|array $value = ''): void
    {
        if (is_array($value)) {
            $this->builder->whereIn('type', $value);
        }
        if (is_string($value) && in_array($value, array_map(fn (UserType $type) => $type->value, UserType::cases()))) {
            $this->builder->where('type', $value);
        }
    }
}
