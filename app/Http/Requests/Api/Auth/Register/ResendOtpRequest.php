<?php

namespace App\Http\Requests\Api\Auth\Register;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;

class ResendOtpRequest extends FormRequest
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
            'token' => 'required',
        ];
    }

    /**
     * This method used to generate the documentation.
     */
    public function bodyParameters(): array
    {
        return [
            'token' => [
                'description' => 'The token of encrypted data',
                'example' => Str::random(60),
            ],
        ];
    }
}
