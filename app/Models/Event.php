<?php

namespace App\Models;

use AhmedAliraqi\LaravelFilterable\Filterable;
use App\Http\Filters\EventFilter;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Event extends Model implements HasMedia
{
    use Filterable;

    /** @use HasFactory<\Database\Factories\EventFactory> */
    use HasFactory;

    use InteractsWithMedia;

    protected $fillable = [
        'name',
        'website',
        'organizer_contact',
        'description',
        'lat',
        'lng',
        'city',
        'street',
        'district',
        'full_address',
    ];

    /**
     * The filter class used for filtering queries on this model.
     *
     * @var class-string<\App\Http\Filters\EventFilter>
     */
    protected string $filter = EventFilter::class;

    public function socialMedia(): HasMany
    {
        return $this->hasMany(EventSocial::class, 'event_id');
    }

    public function days(): HasMany
    {
        return $this->hasMany(EventDay::class, 'event_id');
    }
}
