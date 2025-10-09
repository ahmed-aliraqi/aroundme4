<?php

if (! function_exists('app_copyright')) {
    /**
     * Get the application copyright.
     */
    function app_copyright(): ?string
    {
        return Settings::locale()->get('APP_COPYRIGHT');
    }
}
if (! function_exists('app_name')) {
    /**
     * Get the application name.
     */
    function app_name(): string
    {
        return Settings::locale()
            ->get('APP_NAME', config('app.name', 'Laravel'))
            ?: config('app.name', 'Laravel');
    }
}

if (! function_exists('app_logo')) {
    /**
     * Get the application logo url.
     */
    function app_logo(): string
    {
        if (($model = Settings::instance('LOGO')) && $file = $model->getFirstMediaUrl('LOGO')) {
            return $file;
        }

        return 'https://ui-avatars.com/api/?name='.rawurldecode(app_name()).'&bold=true';
    }
}

if (! function_exists('app_favicon')) {
    /**
     * Get the application favicon url.
     */
    function app_favicon(): string
    {
        if (($model = Settings::instance('FAVICON')) && $file = $model->getFirstMediaUrl('FAVICON')) {
            return $file;
        }

        return '/favicon.ico';
    }
}

if (! function_exists('count_formatted')) {
    /**
     * Format numbers to nearest thousands such as
     * Kilos, Millions, Billions, and Trillions with comma.
     */
    function count_formatted(float $num): string
    {
        if ($num >= 1000) {
            $x = round($num);
            $x_number_format = number_format($x);
            $x_array = explode(',', $x_number_format);
            $x_parts = ['K', 'M', 'B', 'T'];
            $x_count_parts = count($x_array) - 1;
            $x_display = $x_array[0].((int) $x_array[1][0] !== 0 ? '.'.$x_array[1][0] : '');
            $x_display .= $x_parts[$x_count_parts - 1];

            return $x_display;
        }

        return (string) $num;
    }
}

if (! function_exists('user')) {
    /**
     * Get the authenticated user.
     */
    function user(?string $guard = null): \App\Models\User|\Illuminate\Contracts\Auth\Authenticatable|null
    {
        return auth($guard)->user();
    }
}
