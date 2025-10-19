<?php

use App\Http\Controllers\Dashboard\AnalyticController;
use Illuminate\Support\Facades\Route;

Route::get('/analytics', [AnalyticController::class, 'index'])->name('analytics.index');
