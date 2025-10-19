<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}"
      class="light-style layout-navbar-fixed layout-menu-fixed layout-compact"
      dir="{{ Locales::getDir() }}"
      data-theme="theme-default"
      data-mode="light"
      data-template="vertical-menu-template-no-customizer">

    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=400, initial-scale=1">
        <!-- Favicon -->
        <link rel="icon" href="{{ app_favicon() }}" type="image/x-icon" />

        <!-- CSRF Token -->
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <!--end::Primary Meta Tags-->

        <!-- Styles -->
        @routes
        @vite('resources/sass/sneat.scss')
        @vite(['resources/js/ui/layout-config.js'])

        @inertiaHead
    </head>

    <body>
    @inertia
        <!--Scripts -->
        @vite('resources/templates/sneat/assets/vendor/libs/jquery/jquery.js')
        @vite('resources/templates/sneat/assets/vendor/libs/popper/popper.js')
        @vite('resources/templates/sneat/assets/vendor/js/bootstrap.js')
        @vite('resources/templates/sneat/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.js')
        @vite('resources/templates/sneat/assets/vendor/libs/hammer/hammer.js')
        @vite('resources/js/ui/menu.js')
        @vite('resources/js/sneat.js')
        @vite('resources/templates/sneat/assets/js/main.js')
    </body>

</html>
