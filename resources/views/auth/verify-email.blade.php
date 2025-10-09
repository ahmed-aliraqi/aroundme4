<x-dashboard.layouts.guest page-title="{{ __('auth.verify_email.page_title') }}">
    <x-slot:title>{{ __('auth.verify_email.title', ['app' => app_name()]) }}</x-slot:title>
    <x-slot:subtitle>{{ __('auth.verify_email.subtitle') }}</x-slot:subtitle>

    @if (session('status') == 'verification-link-sent')
        <x-shared.status message="{{ __('auth.verify_email.messages.sent') }}"></x-shared.status>
    @endif


    <div class="text-center">
        <x-action href="{{ route('verification.send') }}" method="POST" class="btn btn-primary w-100">
            {{ __('auth.verify_email.actions.send') }}
        </x-action>
    </div>
    <div class="border-top border-1 mt-3 pt-3 text-center">
        <x-action href="{{ route('logout') }}" method="POST">
            <span class="align-middle">{{ __('auth.logout') }}</span>
        </x-action>
    </div>
    <x-auth.locales></x-auth.locales>
</x-dashboard.layouts.guest>
