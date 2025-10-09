<?php

namespace App\Http\Requests\Api\Auth\Register;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Laraeast\LaravelBootstrapForms\Rules\PhoneNumber;

class ResetPasswordRequest extends FormRequest
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
            'phone' => ['required', new PhoneNumber],
        ];
    }

    /**
     * This method used to generate the documentation.
     */
    public function bodyParameters(): array
    {
        return [
            'phone' => [
                'description' => 'Must be a valid international phone number in <b>E.164 format</b>',
                'example' => '+966518632263',
            ],
        ];
    }
}
