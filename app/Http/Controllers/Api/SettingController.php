<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Laraeast\LaravelSettings\Facades\Settings;

/**
 * @group Settings
 */
class SettingController extends Controller
{
    /**
     * App Settings
     *
     * Returns a JSON response containing essential application settings.
     *
     * @responseFile 200 scenario="Settings Response" storage/docs/responses/settings.json
     */
    public function __invoke(): JsonResponse
    {
        return response()->json([
            'data' => [
                'APP_NAME' => app_name(),
                'APP_COPYRIGHT' => app_copyright(),
                'LOGO' => app_logo(),
                'APP_LOCALE' => Settings::get('APP_LOCALE', config('app.locale')),
            ],
        ]);
    }
}
