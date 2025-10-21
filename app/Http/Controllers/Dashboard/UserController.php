<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\User;
use Inertia\Response;

class UserController extends Controller
{
    public function index(): Response
    {
        $users = User::filter()->latest()->paginate();

        return inertia('Dashboard/Users/Index', compact('users'));
    }
}
