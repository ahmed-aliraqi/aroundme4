<x-dashboard.layouts.app :breadcrumbs="['dashboard.profile.edit']" title="{{ __('users.edit_profile') }}">

    <div class="row">
        <div class="col-md-12">
            <div class="row">
                <div class="col-xl-4 col-lg-5 col-md-5">
                    @include('dashboard.profile.partials.card')
                </div>
                <div class="col-xl-8 col-lg-7 col-md-7">
                    <ul class="nav nav-pills flex-column flex-md-row mb-3">
                        <li class="nav-item">
                            <a class="nav-link{{ request('tab') === 'details' || !request('tab') ? ' active' : '' }}"
                                href="{{ route('dashboard.profile.edit', ['tab' => 'details']) }}">
                                <i class="bx bx-user me-1"></i>
                                {{ __('users.tabs.details') }}
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link{{ request('tab') === 'password' ? ' active' : '' }}"
                                href="{{ route('dashboard.profile.edit', ['tab' => 'password']) }}">
                                <i class="bx bx-lock-alt me-1"></i>
                                {{ __('users.tabs.password') }}
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link{{ request('tab') === 'delete-account' ? ' active' : '' }}"
                                href="{{ route('dashboard.profile.edit', ['tab' => 'delete-account']) }}">
                                <i class="bx bx-trash-alt me-1"></i>
                                {{ __('users.actions.delete-account') }}
                            </a>
                        </li>
                    </ul>
                    @if (request('tab') === 'details' || !request('tab'))
                        {{ BsForm::resource('users')->patchModel($user, route('dashboard.profile.update')) }}
                        <x-dashboard.card :title="__('users.tabs.details')">

                            <x-shared.status></x-shared.status>

                            {{ BsForm::base64Image('avatar')->default($user->getAvatar()) }}
                            {{ BsForm::text('name') }}
                            {{ BsForm::email('email') }}
                            {{ BsForm::phone('phone')->value(old('phone', $user->phone)) }}

                            <x-slot:footer>
                                {{ BsForm::submit(__('users.actions.save')) }}
                            </x-slot:footer>

                        </x-dashboard.card>
                        {{ BsForm::close() }}
                    @endif
                    @if (request('tab') === 'password')
                        {{ BsForm::resource('users')->errorBag('updatePassword')->put(route('password.update')) }}
                        <x-dashboard.card :title="__('users.tabs.password')">

                            <x-shared.status></x-shared.status>
                            <x-shared.errors></x-shared.errors>

                            {{ BsForm::password('current_password') }}
                            {{ BsForm::password('password')->label(__('users.attributes.new_password')) }}
                            {{ BsForm::password('password_confirmation') }}

                            <x-slot:footer>
                                {{ BsForm::submit(__('users.actions.save')) }}
                            </x-slot:footer>

                        </x-dashboard.card>
                        {{ BsForm::close() }}
                    @endif
                    @if (request('tab') === 'delete-account')
                        <x-dashboard.card :title="__('users.actions.delete-account')">
                            <div class="col-12 mb-3">
                                <div class="alert alert-warning">
                                    <h6 class="alert-heading fw-medium mb-1">
                                        {{ __('users.delete-account.confirm-title') }}</h6>
                                    <p class="mb-0">{{ __('users.delete-account.confirm-info') }}</p>
                                </div>
                            </div>

                            {{ BsForm::resource('users')->errorBag('userDeletion')->delete(route('dashboard.profile.destroy')) }}

                            <x-shared.status></x-shared.status>
                            <x-shared.errors></x-shared.errors>

                            {{ BsForm::password('password') }}

                            <div class="form-check mb-3">
                                <input class="form-check-input" type="checkbox" name="accountActivation"
                                    onchange="this.closest('form').querySelector('button[type=submit]').disabled = ! this.checked"
                                    id="accountActivation" />
                                <label class="form-check-label"
                                    for="accountActivation">{{ __('users.delete-account.confirm-check') }}</label>
                            </div>

                            {{ BsForm::submit(__('users.delete-account.confirm'))->attribute('disabled', 'disabled') }}

                            {{ BsForm::close() }}
                        </x-dashboard.card>
                    @endif
                </div>
            </div>
        </div>
    </div>

</x-dashboard.layouts.app>
