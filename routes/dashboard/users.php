<?php

use App\Http\Controllers\Dashboard\UserController;
use Illuminate\Support\Facades\Route;

Route::resource('/users', UserController::class);
Route::delete('/users', [UserController::class, 'deleteSelected'])->name('users.delete-selected');
