<?php

namespace App\Models;

use AhmedAliraqi\LaravelFilterable\Filterable;
use App\Enums\UserType;
use App\Http\Filters\UserFilter;
use App\Models\Scopes\UserScopes;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Contracts\Translation\HasLocalePreference;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laraeast\LaravelLocales\Enums\Language;
use Laravel\Sanctum\HasApiTokens;
use Propaganistas\LaravelPhone\Casts\E164PhoneNumberCast;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class User extends Authenticatable implements HasLocalePreference, HasMedia, MustVerifyEmail
{
    use Filterable;
    use HasApiTokens;

    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory;

    use InteractsWithMedia;
    use Notifiable;
    use UserScopes;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'phone',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The filter class used for filtering queries on this model.
     *
     * @var class-string<\App\Http\Filters\UserFilter>
     */
    protected string $filter = UserFilter::class;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'type' => UserType::class,
            'phone' => E164PhoneNumberCast::class,
            'language' => Language::class,
        ];
    }

    /**
     * Get the user's preferred locale.
     */
    public function preferredLocale(): string
    {
        return $this->language->getCode();
    }

    /**
     * Define the media collections.
     */
    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('avatars')
            ->useFallbackUrl($this->defaultAvatar())
            ->singleFile();
    }

    public function defaultAvatar(): string
    {
        return 'https://ui-avatars.com/api/?name='.rawurldecode($this->name).'&bold=true';
    }

    public function getAvatar(): string
    {
        return $this->getFirstMediaUrl('avatars');
    }

    public function canAccessDashboard(): bool
    {
        return $this->type === UserType::ADMIN;
    }

    protected static function booted(): void
    {
        static::creating(fn (self $model) => $model->forceFill(['language' => app()->getLocale()]));
    }
}
