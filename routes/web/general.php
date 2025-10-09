<?php

Route::get('/', function () {
    // return view('welcome');

    return redirect()->route('dashboard.home');
});
