<?php

namespace Tests\Unit;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Laraeast\LaravelSettings\Facades\Settings;
use Tests\TestCase;

class HelpersTest extends TestCase
{
    use RefreshDatabase;

    public function test_count_formatted()
    {
        $this->assertSame(count_formatted(3000), '3K');
        $this->assertSame(count_formatted(35500), '35.5K');
        $this->assertSame(count_formatted(905000), '905K');
        $this->assertSame(count_formatted(5500000), '5.5M');
        $this->assertSame(count_formatted(88800000), '88.8M');
        $this->assertSame(count_formatted(745000000), '745M');
        $this->assertSame(count_formatted(2000000000), '2B');
        $this->assertSame(count_formatted(22200000000), '22.2B');
        $this->assertSame(count_formatted(1000000000000), '1T');
    }

    public function test_app_copyright()
    {
        Settings::locale('en')->set('APP_COPYRIGHT', 'All rights reserved');
        Settings::locale('ar')->set('APP_COPYRIGHT', 'جميع الحقوق محفوظة');

        app()->setLocale('en');
        $this->assertSame('All rights reserved', app_copyright());

        app()->setLocale('ar');
        $this->assertSame('جميع الحقوق محفوظة', app_copyright());
    }

    public function test_app_name()
    {
        $this->assertSame('Laravel', app_name());

        Settings::locale('en')->set('APP_NAME', 'Scaffolding');
        Settings::locale('ar')->set('APP_NAME', 'اسم التطبيق');

        app()->setLocale('en');
        $this->assertSame('Scaffolding', app_name());

        app()->setLocale('ar');
        $this->assertSame('اسم التطبيق', app_name());
    }

    public function test_app_logo()
    {
        app()->setLocale('en');

        $this->assertSame('https://ui-avatars.com/api/?name=Laravel&bold=true', app_logo());

        Storage::fake('public');

        Settings::set('LOGO')->addMedia(UploadedFile::fake()->image('logo.png'))->toMediaCollection('LOGO');

        $logo = Settings::instance('LOGO')->getFirstMediaUrl('LOGO');

        $this->assertSame($logo, app_logo());
    }

    public function test_app_favicon()
    {
        $this->assertSame('/favicon.ico', app_favicon());

        Storage::fake('public');

        Settings::set('FAVICON')->addMedia(UploadedFile::fake()->image('favicon.ico'))->toMediaCollection('FAVICON');

        $favicon = Settings::instance('FAVICON')->getFirstMediaUrl('FAVICON');

        $this->assertSame($favicon, app_favicon());
    }
}
