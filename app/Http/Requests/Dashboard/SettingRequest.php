<?php

namespace App\Http\Requests\Dashboard;

use Astrotomic\Translatable\Validation\RuleFactory;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Laraeast\LaravelLocales\Facades\Locales;

class SettingRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return RuleFactory::make([
            '%APP_NAME%' => ['sometimes', 'required', 'string', 'max:255'],
            '%APP_COPYRIGHT%' => ['sometimes', 'required', 'string', 'max:255'],
            'APP_LOCALE' => ['sometimes', 'required', Rule::in(Locales::codes())],
            'LOGO' => ['sometimes', 'base64image'],
            'FAVICON' => ['sometimes', 'base64image'],
            'MAIL_HOST' => ['sometimes', 'required', 'string', 'max:255'],
            'MAIL_PORT' => ['sometimes', 'required', 'numeric', 'between:1,65535'],
            'MAIL_USERNAME' => ['sometimes', 'required', 'string', 'max:255'],
            'MAIL_PASSWORD' => ['sometimes', 'required', 'string', 'max:255'],
            'MAIL_FROM_NAME' => ['sometimes', 'required', 'string', 'max:255'],
            'MAIL_FROM_ADDRESS' => ['sometimes', 'required', 'string', 'max:255'],
            'SMS_ENABLED' => ['sometimes', 'required', 'boolean'],
            'SMS_ENDPOINT' => ['sometimes', 'required', 'string'],
            'SMS_API_KEY' => ['sometimes', 'required'],
        ]);
    }

    public function attributes()
    {
        return RuleFactory::make(__('settings.attributes'));
    }
}
