<?php

namespace App\Http\Requests\Api\Auth\Register;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;
use Illuminate\Validation\Rules\Password;

class ResetPasswordVerifyRequest extends FormRequest
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
            'otp' => 'required',
            'token' => 'required',
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
            'otp' => [
                'description' => 'The OTP that sent to the phone number.',
                'example' => 1234,
            ],
            'token' => [
                'description' => 'The token of encrypted data',
                'example' => Str::random(60),
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
