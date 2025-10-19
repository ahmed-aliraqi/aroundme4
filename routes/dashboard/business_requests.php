<?php

use App\Http\Controllers\Dashboard\BusinessRequestController;
use Illuminate\Support\Facades\Route;

Route::get('/business-requests', [BusinessRequestController::class, 'index'])->name('business_requests.index');
