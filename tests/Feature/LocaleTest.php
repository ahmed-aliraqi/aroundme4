<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Session;
use Laraeast\LaravelLocales\Facades\Locales;
use Tests\TestCase;

class LocaleTest extends TestCase
{
    use RefreshDatabase;

    /**
     * A basic feature test example.
     */
    public function test_it_can_change_locale_to_one_of_supported_locales(): void
    {
        $this->assertNull(Session::get('locale'));

        $this->get(route('locale.change', ['locale' => 'foo']))->assertNotFound();

        foreach (Locales::get() as $locale) {
            $this->get(route('locale.change', ['locale' => $locale->getCode()]))->assertRedirect();
            $this->assertEquals($locale->getCode(), Session::get('locale'));
        }
    }
}
