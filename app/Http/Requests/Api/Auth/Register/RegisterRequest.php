<?php

namespace App\Http\Requests\Api\Auth\Register;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class RegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique(User::class)],
            'phone' => ['required', 'phone:INTERNATIONAL', Rule::unique(User::class)],
            'password' => ['required', 'confirmed', Password::defaults()],
            'password_confirmation' => ['required', 'same:password'],
        ];
    }

    /**
     * This method used to generate the documentation.
     */
    public function bodyParameters(): array
    {
        return [
            'name' => [
                'description' => 'The user\'s name',
                'example' => 'Test User',
            ],
            'email' => [
                'description' => 'The user\'s email address',
                'example' => 'test-user@demo.com',
            ],
            'phone' => [
                'description' => 'Must be a valid international phone number in <b>E.164 format</b>',
                'example' => '+966518632263',
            ],
            'password' => [
                'description' => 'The user\'s password',
                'example' => 'password',
            ],
            'password_confirmation' => [
                'description' => 'Confirm the user\'s password',
                'example' => 'password',
            ],
        ];
    }
}
