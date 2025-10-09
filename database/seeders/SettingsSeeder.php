<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Laraeast\LaravelSettings\Facades\Settings;

class SettingsSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Settings::set('APP_NAME:en', 'AroundMe');
        Settings::set('APP_NAME:ar', 'AroundMe');

        Settings::set('LOGO')
            ->addMedia(resource_path('templates/sneat/assets/img/logo.png'))
            ->preservingOriginal()
            ->toMediaCollection('LOGO');
    }
}
