<?php

use App\Http\Controllers\Dashboard\EventController;
use Illuminate\Support\Facades\Route;

Route::resource('/events', EventController::class);
Route::delete('/events', [EventController::class, 'deleteSelected'])->name('events.delete-selected');
