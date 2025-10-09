<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('dashboard.home');
})->name('home');
