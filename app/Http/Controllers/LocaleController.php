<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Session;

class LocaleController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(string $locale): RedirectResponse
    {
        Session::put('locale', $locale);

        return back();
    }
}
