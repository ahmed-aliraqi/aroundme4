<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\UserRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Validation\ValidationException;
use Inertia\Response;

class UserController extends Controller
{
    public function index(): Response
    {
        $users = User::filter()->latest()->paginate()->appends(request()->query());

        return inertia('Dashboard/Users/Index', compact('users'));
    }

    public function store(UserRequest $request): RedirectResponse
    {

        User::create($request->allWithHashedPassword());

        return to_route('dashboard.users.index')->with([
            'message' => __('users.messages.created'),
        ]);
    }

    public function update(UserRequest $request, User $user): RedirectResponse
    {
        $user->update($request->allWithHashedPassword());

        return to_route('dashboard.users.index')->with([
            'message' => __('users.messages.updated'),
        ]);
    }

    public function destroy(User $user): RedirectResponse
    {
        if ($user->is(auth()->user())) {
            return back()->with([
                'status' => 'error',
                'message' => __('users.messages.cannot-delete'),
            ]);
        }

        $user->delete();

        return back()->with([
            'message' => __('users.messages.deleted'),
        ]);
    }

    public function deleteSelected(Request $request): RedirectResponse
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:users,id',
        ]);

        $ids = $request->input('ids');

        if (in_array(auth()->id(), $ids)) {
            $ids = Arr::except($ids, auth()->id());
        }

        User::destroy($ids);

        return back();
    }
}
