<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules;
use Illuminate\View\View;
use Inertia\Response;
use Laraeast\LaravelBootstrapForms\Rules\PhoneNumber;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return inertia('Auth/Register', [
            'config' => [
                'banner' => 'https://demos.themeselection.com/sneat-bootstrap-html-admin-template/assets/img/illustrations/girl-with-laptop-light.png',
            ],
        ]);
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        Validator::validate($request->allWithPhoneNumber('phone'), [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:'.User::class],
            'phone' => ['required', new PhoneNumber, Rule::unique(User::class)],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ], [], __('auth.register.attributes'));

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone('phone'),
            'password' => Hash::make($request->password),
        ]);

        event(new Registered($user));

        Auth::login($user);

        return redirect(route('dashboard.home', absolute: false));
    }
}
