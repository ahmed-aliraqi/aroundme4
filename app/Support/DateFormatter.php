<?php

namespace App\Support;

use Carbon\Carbon;
use Carbon\Month;
use Carbon\WeekDay;
use DateTimeInterface;
use JsonSerializable;

class DateFormatter implements JsonSerializable
{
    protected Carbon $date;

    /**
     * Create Date Formatter Instance.
     */
    public function __construct(DateTimeInterface|WeekDay|Month|string|int|float|null $date)
    {
        $this->date = Carbon::parse($date);
    }

    /**
     * Create Date Formatter Instance.
     */
    public static function make(DateTimeInterface|WeekDay|Month|string|int|float|null $date): self
    {
        return new static($date);
    }

    /**
     * Specify data which should be serialized to JSON.
     */
    public function jsonSerialize(): array
    {
        return [
            'date' => $this->date->toDateString(),
            'for_humans' => $this->date->diffForHumans(),
            'formatted' => $this->date->toDayDateTimeString(),
        ];
    }

    /**
     * Convert the date to string.
     */
    public function __toString(): string
    {
        return (string) data_get($this->jsonSerialize(), 'date');
    }
}
