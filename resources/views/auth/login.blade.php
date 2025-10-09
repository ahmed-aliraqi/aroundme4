<x-dashboard.layouts.guest page-title="{{ __('auth.login.page_title') }}">
    <x-slot:title>{{ __('auth.login.title', ['app' => app_name()]) }}</x-slot:title>
    <x-slot:subtitle>{{ __('auth.login.subtitle') }}</x-slot:subtitle>

    <x-shared.errors></x-shared.errors>
    <x-shared.status></x-shared.status>

    {{ BsForm::resource('auth.login')->post(route('login'), ['class' => 'mb-3']) }}

    {{ BsForm::text('email')->autofocus() }}

    {{ BsForm::password('password')->placeholder('············') }}

    {{ BsForm::checkbox('remember')->default(0) }}

    {{ BsForm::submit(__('auth.login.actions.submit'))->primary()->attribute(['class' => 'mb-3 btn btn-primary d-grid w-100']) }}

    {{ BsForm::close() }}

    <p class="text-center">
        <a href="{{ route('password.request') }}">
            <span>{{ __('auth.login.actions.forget') }}</span>
        </a>
    </p>
    @if (Route::has('register'))
        <p class="text-center">
            <a href="{{ route('register') }}">
                <span>{{ __('auth.login.actions.register') }}</span>
            </a>
        </p>
    @endif
    <x-auth.locales></x-auth.locales>
</x-dashboard.layouts.guest>
