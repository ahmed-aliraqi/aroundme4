<x-dashboard.layouts.guest page-title="{{ __('auth.reset_password.page_title') }}">
    <x-slot:title>{{ __('auth.reset_password.title', ['app' => app_name()]) }}</x-slot:title>
    <x-slot:subtitle>{{ __('auth.reset_password.for') }} <span class="fw-medium">{{ $request->email }}</span></x-slot:subtitle>

    <x-shared.status></x-shared.status>

    {{ BsForm::resource('auth.reset_password')->post(route('password.store'), ['class' => 'mb-3']) }}

    {{ html()->hidden('token', $request->route('token')) }}
    {{ html()->hidden('email', old('email', $request->email)) }}
    {{ BsForm::password('password')->autofocus() }}
    {{ BsForm::password('password_confirmation') }}

    {{ BsForm::submit(__('auth.reset_password.actions.submit'))->primary()->attribute(['class' => 'mb-3 btn btn-primary d-grid w-100']) }}

    {{ BsForm::close() }}

    <div class="text-center">
        <a href="{{ route('login') }}" class="d-flex align-items-center justify-content-center">
            <i class="bx bx-chevron-left scaleX-n1-rtl bx-sm"></i>
            {{ __('auth.reset_password.actions.login') }}
        </a>
    </div>
    <x-auth.locales></x-auth.locales>
</x-dashboard.layouts.guest>
