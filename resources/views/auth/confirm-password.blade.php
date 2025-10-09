<x-dashboard.layouts.guest page-title="{{ __('auth.confirm_password.page_title') }}">
    <x-slot:title>{{ __('auth.confirm_password.title', ['app' => app_name()]) }}</x-slot:title>
    <x-slot:subtitle>{{ __('auth.confirm_password.subtitle') }}</x-slot:subtitle>

    <x-shared.status></x-shared.status>

    {{ BsForm::resource('auth.confirm_password')->post(route('password.confirm'), ['class' => 'mb-3']) }}

    {{ BsForm::password('password')->autofocus() }}

    {{ BsForm::submit(__('auth.confirm_password.actions.submit'))->primary()->attribute(['class' => 'mb-3 btn btn-primary d-grid w-100']) }}

    {{ BsForm::close() }}
    <x-auth.locales></x-auth.locales>
</x-dashboard.layouts.guest>
