<?php

namespace App\Http\Controllers\Dashboard\Analytics;

use App\Http\Controllers\Controller;
use Inertia\Response;

class AppUserController extends Controller
{
    public function index(): Response
    {
        return inertia('Dashboard/Analytics/AppUsers');
    }
}
