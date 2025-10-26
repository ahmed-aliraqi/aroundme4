<?php

use App\Http\Controllers\Api\MapController;
use Illuminate\Support\Facades\Route;

Route::get('/map/style', [MapController::class, 'style'])->name('map.style');
Route::get('/map/geo-search', [MapController::class, 'geoSearch'])->name('map.geo-search');
Route::get('/map/address', [MapController::class, 'getAddress'])->name('map.address');
Route::get('/map/search', [MapController::class, 'searchForMap'])->name('map.search');
