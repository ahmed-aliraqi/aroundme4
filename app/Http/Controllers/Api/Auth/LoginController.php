<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Auth\LoginRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Auth\Events\Login;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

/**
 * @group Auth
 *
 * @subgroup Login
 */
class LoginController extends Controller
{
    /**
     * Login
     *
     * Handle an incoming authentication request.
     *
     * @responseFile status=200 scenario="Logged In " storage/docs/responses/auth/login/200.json
     * @responseFile status=422 scenario="Validation Error" storage/docs/responses/auth/login/422-validation.json
     * @responseFile status=422 scenario="Invalid Credentials" storage/docs/responses/auth/login/422-invalid-credentials.json
     */
    public function __invoke(LoginRequest $request): UserResource
    {
        $user = User::whereUsername($request->username)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'username' => [__('auth.failed')],
            ]);
        }

        event(
            new Login(
                guard: 'sanctum',
                user: $user,
                remember: false
            )
        );

        return (new UserResource($user))
            ->additional([
                'access_token' => $user->createToken(
                    $request->header('user-agent')
                )->plainTextToken,
            ]);
    }
}
