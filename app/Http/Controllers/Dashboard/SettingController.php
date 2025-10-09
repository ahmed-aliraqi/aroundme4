<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\SettingRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\View\View;
use Laraeast\LaravelSettings\Facades\Settings;

class SettingController extends Controller
{
    /**
     * Display the settings form
     */
    public function index(?string $tab = null): View|RedirectResponse
    {
        $tabs = array_keys(__('settings.tabs'));

        if (! in_array($tab, $tabs)) {
            return redirect()->route('dashboard.settings.index', 'main');
        }

        return view('dashboard.settings.index', compact('tab'));
    }

    public function update(SettingRequest $request)
    {
        $fileKeys = [
            'LOGO',
            'FAVICON',
        ];

        foreach ($request->except(['_token', '_method', ...$fileKeys]) as $key => $value) {
            Settings::set($key, $value);
        }

        foreach ($fileKeys as $fileKey) {
            if ($request->{$fileKey}) {
                Settings::set($fileKey)->addMediaFromBase64($request->{$fileKey})
                    ->usingName($fileKey)
                    ->usingFileName($fileKey.'.png')
                    ->toMediaCollection($fileKey);
            }
        }

        return back()->with('status', __('settings.messages.updated'));
    }
}
