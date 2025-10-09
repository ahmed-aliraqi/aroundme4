@props([
    'pageTitle' => '',
    'title' => '',
    'subtitle' => '',
    'styles' => '',
    'scripts' => '',
])
<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}" class="light-style layout-wide customizer-hide" dir="{{ Locales::getDir() }}"
    data-theme="theme-default" data-template="vertical-menu-template-no-customizer">

    <head>
        <meta charset="utf-8" />
        <meta name="viewport"
            content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0" />

        <title>{{ !empty($pageTitle) ? $pageTitle . ' | ' . app_name() : app_name() }}</title>

        <!-- Favicon -->
        <link rel="icon" href="{{ app_favicon() }}" type="image/x-icon" />

        <!-- CSRF Token -->
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <!--end::Primary Meta Tags-->

        <!-- Styles -->
        <link rel="stylesheet" href="{{ asset(mix('/css/sneat.css')) }}">

        <!-- Page Styles -->
        {{ $styles ?? '' }}
    </head>

    <body>
        <!-- Content -->

        <div class="container-xxl">
            <div class="authentication-wrapper authentication-basic container-p-y">
                <div class="authentication-inner">
                    <div class="card">
                        <div class="card-body">
                            <!-- Logo -->
                            <div class="app-brand justify-content-center">
                                <a href="{{ url('/') }}" class="app-brand-link gap-2">
                                    <span class="app-brand-logo demo">
                                        <img src="{{ app_logo() }}" class="mw-100" style="height: 60px;"
                                            alt="{{ app_name() }}">
                                    </span>
                                </a>
                            </div>
                            <!-- /Logo -->
                            <h4 {{ $title->attributes->class('mb-2') }}>{{ $title }}</h4>
                            <p {{ $subtitle->attributes->class('mb-4') }}>{{ $subtitle }}</p>

                            {{ $slot }}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- / Content -->
    </body>

</html>
