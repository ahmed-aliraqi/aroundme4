<x-dashboard.layouts.guest page-title="{{ __('auth.register.page_title') }}">
    <x-slot:title>{{ __('auth.register.title', ['app' => app_name()]) }}</x-slot:title>
    <x-slot:subtitle>{{ __('auth.register.subtitle') }}</x-slot:subtitle>

    <x-shared.errors></x-shared.errors>
    <x-shared.status></x-shared.status>

    {{ BsForm::resource('auth.register')->post(route('register'), ['class' => 'mb-3']) }}

    {{ BsForm::text('name')->autofocus() }}

    {{ BsForm::text('email') }}
    {{ BsForm::phone('phone') }}

    {{ BsForm::password('password')->placeholder('············') }}
    {{ BsForm::password('password_confirmation')->placeholder('············') }}

    {{ BsForm::checkbox('remember')->default(0) }}

    {{ BsForm::submit(__('auth.register.actions.submit'))->primary()->attribute(['class' => 'mb-3 btn btn-primary d-grid w-100']) }}

    {{ BsForm::close() }}

    <p class="text-center">
        {{ __('auth.register.have_account') }}
        <a href="{{ route('login') }}">
            {{ __('auth.register.actions.login') }}
        </a>
    </p>
    <x-auth.locales></x-auth.locales>
</x-dashboard.layouts.guest>
