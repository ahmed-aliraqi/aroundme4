{{ BsForm::resource('settings')->put(route('dashboard.settings.update')) }}
<x-dashboard.card :title="__('settings.tabs.sms')">
    <x-shared.status></x-shared.status>

    {{ BsForm::checkbox('SMS_ENABLED')->value(1)->withDefault(0)->checked(Settings::get('SMS_ENABLED', config('services.sms.enabled'))) }}
    {{ BsForm::text('SMS_ENDPOINT')->value(Settings::get('SMS_ENDPOINT', config('services.sms.endpoint'))) }}
    {{ BsForm::text('SMS_API_KEY')->value(Settings::get('SMS_API_KEY', config('services.sms.api_key'))) }}

    <x-slot:footer>
        {{ BsForm::submit(__('settings.actions.save')) }}
    </x-slot:footer>

</x-dashboard.card>
{{ BsForm::close() }}
