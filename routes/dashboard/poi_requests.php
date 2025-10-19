<?php

use App\Http\Controllers\Dashboard\PoiRequestController;
use Illuminate\Support\Facades\Route;

Route::get('/poi-requests', [PoiRequestController::class, 'index'])->name('poi_requests.index');
