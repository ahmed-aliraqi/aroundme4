<?php

use App\Http\Controllers\Dashboard\PoiController;
use Illuminate\Support\Facades\Route;

Route::get('/pois', [PoiController::class, 'index'])->name('pois.index');
