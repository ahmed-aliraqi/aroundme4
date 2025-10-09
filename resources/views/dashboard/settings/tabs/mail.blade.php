{{ BsForm::resource('settings')->put(route('dashboard.settings.update')) }}
<x-dashboard.card :title="__('settings.tabs.mail')">

    <div class="alert alert-primary d-flex" role="alert">
        <strong class="me-2">{{ __('settings.note.mail.title') }}:</strong> {{ __('settings.note.mail.body') }}
    </div>

    <x-shared.status></x-shared.status>

    {{ BsForm::text('MAIL_HOST')->value(Settings::get('MAIL_HOST', config('mail.mailers.smtp.host'))) }}
    {{ BsForm::text('MAIL_PORT')->value(Settings::get('MAIL_PORT', config('mail.mailers.smtp.port')))->attribute([
            'class' => 'form-control digits-only',
            'data-max' => 65535,
        ]) }}
    {{ BsForm::text('MAIL_USERNAME')->value(Settings::get('MAIL_USERNAME', config('mail.mailers.smtp.username'))) }}
    {{ BsForm::text('MAIL_PASSWORD')->value(Settings::get('MAIL_PASSWORD', config('mail.mailers.smtp.password'))) }}
    {{ BsForm::text('MAIL_FROM_NAME')->value(Settings::get('MAIL_FROM_NAME', config('mail.from.name'))) }}
    {{ BsForm::text('MAIL_FROM_ADDRESS')->value(Settings::get('MAIL_FROM_ADDRESS', config('mail.from.address'))) }}

    <x-slot:footer>
        {{ BsForm::submit(__('settings.actions.save')) }}
    </x-slot:footer>

</x-dashboard.card>
{{ BsForm::close() }}
