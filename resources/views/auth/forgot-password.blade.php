<x-dashboard.layouts.guest page-title="{{ __('auth.forget_password.page_title') }}">
    <x-slot:title>{{ __('auth.forget_password.title', ['app' => app_name()]) }}</x-slot:title>
    <x-slot:subtitle>{{ __('auth.forget_password.subtitle') }}</x-slot:subtitle>

    <x-shared.status></x-shared.status>

    {{ BsForm::resource('auth.forget_password')->post(route('password.email'), ['class' => 'mb-3']) }}

    {{ BsForm::text('email')->autofocus() }}

    {{ BsForm::submit(__('auth.forget_password.actions.submit'))->primary()->attribute(['class' => 'mb-3 btn btn-primary d-grid w-100']) }}

    {{ BsForm::close() }}

    <div class="text-center">
        <a href="{{ route('login') }}" class="d-flex align-items-center justify-content-center">
            <i class="bx bx-chevron-left scaleX-n1-rtl bx-sm"></i>
            {{ __('auth.forget_password.actions.login') }}
        </a>
    </div>
    <x-auth.locales></x-auth.locales>
</x-dashboard.layouts.guest>
