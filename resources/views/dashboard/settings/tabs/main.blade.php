{{ BsForm::resource('settings')->put(route('dashboard.settings.update')) }}
<x-dashboard.card :title="__('settings.tabs.main')">

    <x-shared.status></x-shared.status>

    @multilingualFormTabs
        {{ BsForm::text('APP_NAME')->value(Settings::locale($locale->getCode())->get('APP_NAME')) }}
        {{ BsForm::text('APP_COPYRIGHT')->value(Settings::locale($locale->getCode())->get('APP_COPYRIGHT')) }}
    @endMultilingualFormTabs

    {{ BsForm::select('APP_LOCALE')->options(
            collect(Locales::get())->mapWithKeys(fn($locale) => [$locale->getCode() => $locale->getName()])->toArray(),
        )->value(Settings::get('APP_LOCALE', config('app.locale'))) }}

    {{ BsForm::base64Image('LOGO')->default(app_logo()) }}

    {{ BsForm::base64Image('FAVICON')->default(app_favicon()) }}

    <x-slot:footer>
        {{ BsForm::submit(__('settings.actions.save')) }}
    </x-slot:footer>

</x-dashboard.card>
{{ BsForm::close() }}
