<?php

namespace App\Http\Requests\Dashboard;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class EventRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        if ($this->isMethod('POST')) {
            return $this->createRules();
        } else {
            return $this->updateRules();
        }
    }

    /**
     * Get the create validation rules that apply to the request.
     *
     * @return array
     */
    public function createRules()
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'unique:events'],
            'phone' => ['required', 'unique:events,phone'],
            'password' => ['required', 'min:8', 'confirmed'],
            'type' => ['sometimes', 'nullable', Rule::in(array_keys(trans('events.types')))],
        ];
    }

    /**
     * Get the update validation rules that apply to the request.
     *
     * @return array
     */
    public function updateRules()
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'unique:events,email,' . $this->route('event')->id],
            'phone' => ['required', 'unique:events,phone,' . $this->route('event')->id],
            'password' => ['nullable', 'min:8', 'confirmed'],
            'type' => ['sometimes', 'nullable', Rule::in(array_keys(trans('events.types')))],
        ];
    }

    /**
     * Get custom attributes for validator errors.
     *
     * @return array
     */
    public function attributes()
    {
        return trans('events.attributes');
    }
}
