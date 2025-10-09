<?php

Route::namespace('App\Http\Controllers\Api')
    ->as('api.')
    ->group(function () {
        foreach (glob(__DIR__.'/api/*.php') as $routes) {
            include $routes;
        }
    });
