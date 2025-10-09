<?php

namespace App\Http\Requests\Api\Auth;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Laraeast\LaravelBootstrapForms\Rules\PhoneNumber;

/**
 * @method \App\Models\User user($guard = null)
 */
class UserRequest extends FormRequest
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
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique(User::class)->ignore(auth()->id())],
            'phone' => [
                'required',
                new PhoneNumber,
                Rule::unique(User::class)->ignore(auth()->id()),
            ],
            'avatar' => ['nullable', 'image'],
        ];
    }

    public function bodyParameters(): array
    {
        return [
            'name' => [
                'description' => 'The name of the user',
                'example' => 'Ahmed',
            ],
            'email' => [
                'description' => 'The email of the user',
                'example' => 'partner@demo.com',
            ],
            'avatar' => [
                'description' => 'The avatar image of the user',
                'example' => 'No-example',
            ],
        ];
    }
}
