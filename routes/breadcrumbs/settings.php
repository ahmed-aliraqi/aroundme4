<?php

Breadcrumbs::for('dashboard.settings.index', function ($breadcrumb, $tab) {
    $breadcrumb->parent('dashboard.home');
    $breadcrumb->push(trans('settings.title'), route('dashboard.settings.index', 'main'));
    $breadcrumb->push(trans('settings.tabs.'.$tab), route('dashboard.settings.index', $tab));
});
