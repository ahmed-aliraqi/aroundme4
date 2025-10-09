<!-- About User -->
<div class="card mb-4">
    <div class="card-body">
        <small class="text-muted text-uppercase">{{ __('users.about') }}</small>
        <ul class="list-unstyled mb-4 mt-3">
            <li class="d-flex align-items-center mb-3">
                <i class="bx bx-user"></i><span class="fw-medium mx-2">{{ __('users.attributes.name') }}:</span>
                <span>{{ $user->name }}</span>
            </li>
            <li class="d-flex align-items-center mb-3">
                <i class="bx bx-star"></i><span class="fw-medium mx-2">{{ __('users.attributes.role') }}:</span>
                <span>{{ $user->type->label() }}</span>
            </li>
            <li class="d-flex align-items-center mb-3">
                <i class="bx bx-globe-alt"></i> <span
                    class="fw-medium mx-2">{{ __('users.attributes.language') }}:</span>
                <span>{{ $user->language->getName() }}</span>
            </li>
        </ul>
        <small class="text-muted text-uppercase">{{ __('users.contacts') }}</small>
        <ul class="list-unstyled mb-4 mt-3">
            <li class="d-flex align-items-center mb-3">
                <i class="bx bx-phone"></i><span class="fw-medium mx-2">{{ __('users.attributes.phone') }}:</span>
                <span><a href="tel:{{ $user->phone }}">{{ $user->phone }}</a></span>
            </li>
            <li class="d-flex align-items-center mb-3">
                <i class="bx bx-envelope"></i><span class="fw-medium mx-2">{{ __('users.attributes.email') }}:</span>
                <span><a href="mailto:{{ $user->email }}">{{ $user->email }}</a></span>
            </li>
        </ul>
    </div>
</div>
<!--/ About User -->
