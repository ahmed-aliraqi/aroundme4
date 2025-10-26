<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EventSocial extends Model
{
    /** @use HasFactory<\Database\Factories\EventSocialFactory> */
    use HasFactory;

    protected $fillable = [
        'type',
        'link',
    ];
}
