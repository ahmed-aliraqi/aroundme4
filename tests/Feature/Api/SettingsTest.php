<?php

namespace Tests\Feature\Api;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Laraeast\LaravelLocales\Facades\Locales;
use Laraeast\LaravelSettings\Facades\Settings;
use Tests\TestCase;

class SettingsTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_return_the_settings_list(): void
    {
        foreach (Locales::get() as $locale) {
            app()->setLocale($locale->getCode());

            $this->getJson('/api/settings')
                ->assertSuccessful()
                ->assertJsonPath('data.APP_NAME', 'Laravel');
        }

        foreach (Locales::get() as $locale) {
            Settings::set('APP_NAME:'.$locale->getCode(), sprintf('Blog (%s)', $locale->getName()));
        }

        foreach (Locales::get() as $locale) {
            app()->setLocale($locale->getCode());

            $this->getJson('/api/settings')
                ->assertSuccessful()
                ->assertJsonPath('data.APP_NAME', sprintf('Blog (%s)', $locale->getName()));
        }

    }
}
