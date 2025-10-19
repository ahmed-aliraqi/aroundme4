<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Inertia\Response;

class PoiController extends Controller
{
    public function index(): Response
    {
        return inertia('Dashboard/Pois/Index');
    }
}
