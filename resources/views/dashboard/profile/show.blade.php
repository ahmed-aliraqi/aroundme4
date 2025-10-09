<?php /** @var \App\Models\User $user */ ?>
<x-dashboard.layouts.app :breadcrumbs="['dashboard.profile.show']" title="{{ $user->name }}">

    <!-- Header -->
    <div class="row">
        <div class="col-12">
            <div class="card mb-4">
                <div class="user-profile-header-banner">
                    <img src="{{ asset('/images/pages/profile-banner.png') }}" alt="Banner image" class="rounded-top" />
                </div>
                <div class="user-profile-header d-flex flex-column flex-sm-row text-sm-start mb-4 text-center">
                    <div class="mt-n2 mx-sm-0 mx-auto flex-shrink-0">
                        <img src="{{ $user->getAvatar() }}" alt="user image"
                            class="d-block ms-sm-4 user-profile-img ms-0 h-auto rounded" />
                    </div>
                    <div class="flex-grow-1 mt-sm-5 mt-3">
                        <div
                            class="d-flex align-items-md-end align-items-sm-start align-items-center justify-content-md-between justify-content-start flex-md-row flex-column mx-4 gap-4">
                            <div class="user-profile-info">
                                <h4>{{ $user->name }}</h4>
                                <ul
                                    class="list-inline d-flex align-items-center justify-content-sm-start justify-content-center mb-0 flex-wrap gap-2">
                                    <li class="list-inline-item fw-medium"><i class="bx bx-star"></i>
                                        {{ $user->type->label() }}</li>
                                    <li class="list-inline-item fw-medium">
                                        <i class="bx bx-calendar-alt"></i> {{ __('users.attributes.created_at') }}
                                        {{ $user->created_at->format('F Y') }}
                                    </li>
                                </ul>
                            </div>
                            <a href="{{ route('dashboard.profile.edit') }}" class="btn btn-primary text-nowrap">
                                <i class="bx bx-user-check me-1"></i>{{ __('users.edit_profile') }}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--/ Header -->

    <!-- User Profile Content -->
    <div class="row">
        <div class="col-xl-4 col-lg-5 col-md-5">
            @include('dashboard.profile.partials.card')
        </div>
    </div>
    <!--/ User Profile Content -->

</x-dashboard.layouts.app>
