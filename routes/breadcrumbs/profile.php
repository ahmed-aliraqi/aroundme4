<?php

Breadcrumbs::for('dashboard.profile.show', function ($breadcrumb) {
    $breadcrumb->parent('dashboard.home');
    $breadcrumb->push(trans('users.my_profile'), route('dashboard.profile.show'));
});

Breadcrumbs::for('dashboard.profile.edit', function ($breadcrumb) {
    $breadcrumb->parent('dashboard.profile.show');
    $breadcrumb->push(trans('users.edit_profile'), route('dashboard.profile.show'));
});
