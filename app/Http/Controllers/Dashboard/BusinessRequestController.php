<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Inertia\Response;

class BusinessRequestController extends Controller
{
    public function index(): Response
    {
        return inertia('Dashboard/BusinessRequests/Index');
    }
}
