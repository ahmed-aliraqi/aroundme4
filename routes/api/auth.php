<?php

use App\Http\Controllers\Api\Auth\LoginController;
use App\Http\Controllers\Api\Auth\ProfileController;
use App\Http\Controllers\Api\Auth\RegisterController;
use App\Http\Controllers\Api\Auth\ResetPasswordController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    // Register routes.
    Route::post('register/otp/send', [RegisterController::class, 'sendOtp'])->name('register.otp.send');
    Route::post('register/verify', [RegisterController::class, 'verify'])->name('register.verify');
    Route::post('register/otp/resend', [RegisterController::class, 'resendOtp'])->name('register.otp.resend');

    // Reset password routes.
    Route::post('password/otp/send', [ResetPasswordController::class, 'sendOtp'])->name('password.otp.send');
    Route::post('password/verify', [ResetPasswordController::class, 'verify'])->name('password.verify');
    Route::post('password/otp/resend', [ResetPasswordController::class, 'resendOtp'])->name('password.otp.resend');

    // Login route.
    Route::post('login', LoginController::class)->name('login');

});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('profile', ProfileController::class)->name('profile.index');
    Route::post('profile', [ProfileController::class, 'update'])->name('profile.update');
});
