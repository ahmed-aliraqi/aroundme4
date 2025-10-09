<?php

use App\Http\Controllers\LocaleController;
use Illuminate\Support\Facades\Route;
use Laraeast\LaravelLocales\Facades\Locales;

require __DIR__.'/auth.php';

foreach (glob(__DIR__.'/web/*.php') as $routes) {
    include $routes;
}

Route::get('locale/{locale}', LocaleController::class)
    ->name('locale.change')
    ->whereIn('locale', Locales::codes());

Route::prefix('dashboard')
    ->namespace('App\Http\Controllers\Dashboard')
    ->middleware('dashboard')
    ->as('dashboard.')
    ->group(function () {
        foreach (glob(__DIR__.'/dashboard/*.php') as $routes) {
            include $routes;
        }
    });

Route::get('test', function () {
    return \Inertia\Inertia::render('Test', [
        'event' => ['name' => 'test'],
    ]);
});
Route::get('about', function () {
    sleep(1);
    return \Inertia\Inertia::render('About');
});
