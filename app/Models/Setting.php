<?php

namespace App\Models;

use Laraeast\LaravelSettings\Models\Setting as BaseSettingModel;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class Setting extends BaseSettingModel implements HasMedia
{
    use InteractsWithMedia;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'settings';

    /**
     * Define the media collections.
     */
    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('LOGO')->singleFile();
        $this->addMediaCollection('FAVICON')->singleFile();
    }
}
