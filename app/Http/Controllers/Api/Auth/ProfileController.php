<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Auth\UserRequest;
use App\Http\Resources\UserResource;
use App\Services\ProfileService;
use Illuminate\Http\Request;

/**
 * @group Auth
 *
 * @subgroup Profile
 *
 * @authenticated
 */
class ProfileController extends Controller
{
    public function __construct(
        protected ProfileService $service
    ) {}

    /**
     * Show profile
     *
     * Show the user's profile
     *
     * @responseFile 200 scenario="User Response" storage/docs/responses/auth/user.json
     */
    public function __invoke(Request $request): UserResource
    {
        return new UserResource(user());
    }

    /**
     * Edit profile
     *
     * Update the user's profile
     *
     * @header Content-Type multipart/form-data
     *
     * @responseFile 200 scenario="User Response" storage/docs/responses/auth/user.json
     */
    public function update(UserRequest $request): UserResource
    {
        $this->service->updateUser(
            user: user(),
            data: $request->validated()
        );

        return (new UserResource(user()))->additional([
            'message' => __('users.messages.profile-updated'),
        ]);
    }
}
