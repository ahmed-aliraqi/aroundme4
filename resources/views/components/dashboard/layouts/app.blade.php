<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}"
      class="light-style layout-navbar-fixed layout-menu-fixed layout-compact"
      dir="{{ Locales::getDir() }}"
      data-theme="theme-default"
      data-template="vertical-menu-template-no-customizer">

    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=400, initial-scale=1">

        <title>{{ !empty($title) ? $title . ' | ' . app_name() : app_name() }}</title>

        <!-- Favicon -->
        <link rel="icon" href="{{ app_favicon() }}" type="image/x-icon" />

        <!-- CSRF Token -->
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <!--end::Primary Meta Tags-->

        <!-- Styles -->
        @vite('resources/sass/sneat.scss')
        <!-- Page Styles -->
        {{ $styles ?? '' }}
        @vite(['resources/js/ui/layout-config.js'])

    </head>

    <body>
        <!-- Layout wrapper -->
        <div class="layout-wrapper layout-content-navbar" id="app">
            <div class="layout-container">
                <!-- Menu -->

                <aside id="layout-menu" class="layout-menu menu-vertical menu bg-menu-theme">
                    <div class="app-brand demo">
                        <a href="{{ route('dashboard.home') }}" class="app-brand-link">
                            <span class="app-brand-logo demo">
                                <img src="{{ app_logo() }}" class="mw-100" style="height: 35px;"
                                    alt="{{ app_name() }}">
                            </span>
                        </a>

                        <a href="javascript:void(0);" class="layout-menu-toggle menu-link text-large ms-auto">
                            <i class="bx bx-chevron-left bx-sm align-middle"></i>
                        </a>
                    </div>

                    <div class="menu-inner-shadow"></div>

                    <ul class="menu-inner py-1">
                        @include('dashboard.layout.sidebar')
                    </ul>
                </aside>
                <!-- / Menu -->

                <!-- Layout container -->
                <div class="layout-page">
                    <!-- Navbar -->

                    <nav class="layout-navbar container-fluid navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
                        id="layout-navbar">
                        <div class="layout-menu-toggle navbar-nav align-items-xl-center me-xl-0 d-xl-none me-3">
                            <a class="nav-item nav-link me-xl-4 px-0" href="javascript:void(0)">
                                <i class="bx bx-menu bx-sm"></i>
                            </a>
                        </div>

                        <div class="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
                            <ul class="navbar-nav align-items-center ms-auto flex-row">
                                <!-- Language -->
                                <li class="nav-item dropdown-language dropdown me-xl-0 me-2">
                                    <a class="nav-link dropdown-toggle hide-arrow" href="javascript:void(0);"
                                        data-bs-toggle="dropdown">
                                        <i class="bx bx-globe bx-sm"></i>
                                    </a>
                                    <ul class="dropdown-menu dropdown-menu-end">
                                        @foreach (Locales::get() as $locale)
                                            <li>
                                                <a class="dropdown-item"
                                                    href="{{ route('locale.change', $locale->getCode()) }}">
                                                    {{ $locale->getSvgFlag(width: 25, height: 25) }}
                                                    <span class="ms-1">
                                                        {{ $locale->getName() }}
                                                    </span>
                                                </a>
                                            </li>
                                        @endforeach
                                    </ul>
                                </li>
                                <!-- /Language -->

                                <v-notifications-dropdown></v-notifications-dropdown>

                                <!-- User -->
                                <li class="nav-item navbar-dropdown dropdown-user dropdown">
                                    <a class="nav-link dropdown-toggle hide-arrow" href="javascript:void(0);"
                                        data-bs-toggle="dropdown">
                                        <div class="avatar avatar-online">
                                            <img src="{{ user()->getAvatar() }}" alt
                                                class="w-px-40 rounded-circle h-auto" />
                                        </div>
                                    </a>
                                    <ul class="dropdown-menu dropdown-menu-end">
                                        <li>
                                            <a class="dropdown-item" href="{{ route('dashboard.profile.show') }}">
                                                <div class="d-flex">
                                                    <div class="me-3 flex-shrink-0">
                                                        <div class="avatar avatar-online">
                                                            <img src="{{ user()->getAvatar() }}" alt
                                                                class="w-px-40 rounded-circle h-auto" />
                                                        </div>
                                                    </div>
                                                    <div class="flex-grow-1">
                                                        <span class="fw-medium d-block">{{ user()->name }}</span>
                                                        <small class="text-muted">{{ user()->email }}</small>
                                                    </div>
                                                </div>
                                            </a>
                                        </li>
                                        <li>
                                            <div class="dropdown-divider"></div>
                                        </li>
                                        <li>
                                            <a class="dropdown-item" href="{{ route('dashboard.profile.show') }}">
                                                <i class="bx bx-user me-2"></i>
                                                <span class="align-middle">{{ __('users.my_profile') }}</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a class="dropdown-item" href="{{ route('dashboard.profile.edit') }}">
                                                <i class="bx bx-cog me-2"></i>
                                                <span class="align-middle">{{ __('users.edit_profile') }}</span>
                                            </a>
                                        </li>
                                        <li>
                                            <div class="dropdown-divider"></div>
                                        </li>
                                        <li>
                                            <x-action class="dropdown-item" href="{{ route('logout') }}"
                                                method="POST">
                                                <i class="bx bx-power-off me-2"></i>
                                                <span class="align-middle">{{ __('auth.logout') }}</span>
                                            </x-action>
                                        </li>
                                    </ul>
                                </li>
                                <!--/ User -->
                            </ul>
                        </div>
                    </nav>

                    <!-- / Navbar -->

                    <!-- Content wrapper -->
                    <div class="content-wrapper">
                        <!-- Content -->

                        <div class="container-fluid flex-grow-1 container-p-y">
                            <div class="h4 mb-4 py-3">
                                @isset($breadcrumbs)
                                    {{ Breadcrumbs::render(...$breadcrumbs) }}
                                @endisset
                            </div>

                            {{ $slot }}
                        </div>
                        <!-- / Content -->

                        <!-- Footer -->
                        <footer class="content-footer footer bg-footer-theme">
                            <div
                                class="container-fluid d-flex justify-content-between flex-md-row flex-column flex-wrap py-2">
                                <div class="mb-md-0 mb-2">
                                    {{ app_copyright() }}
                                </div>
                                @env('local')
                                <div class="d-none d-lg-inline-block">
                                    <p class="text-muted">Laravel v{{ Illuminate\Foundation\Application::VERSION }}
                                        (PHP
                                        v{{ PHP_VERSION }})</p>
                                </div>
                                @endenv
                            </div>
                        </footer>
                        <!-- / Footer -->

                        <div class="content-backdrop fade"></div>
                    </div>
                    <!-- Content wrapper -->
                </div>
                <!-- / Layout page -->
            </div>

            <!-- Overlay -->
            <div class="layout-overlay layout-menu-toggle"></div>

            <!-- Drag Target Area To SlideIn Menu On Small Screens -->
            <div class="drag-target"></div>
        </div>
        <!-- / Layout wrapper -->

        <!--Scripts -->
        @vite('resources/templates/sneat/assets/vendor/libs/jquery/jquery.js')
        @vite('resources/templates/sneat/assets/vendor/libs/popper/popper.js')
        @vite('resources/templates/sneat/assets/vendor/js/bootstrap.js')
        @vite('resources/templates/sneat/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.js')
        @vite('resources/templates/sneat/assets/vendor/libs/hammer/hammer.js')
        @vite('resources/js/ui/menu.js')
        @vite('resources/js/sneat.js')

        <!-- Page JS -->
        {{ $scripts ?? '' }}
        @vite('resources/templates/sneat/assets/js/main.js')
    </body>

</html>
