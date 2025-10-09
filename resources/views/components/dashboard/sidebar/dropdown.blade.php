@props([
    'icon' => null,
    'svg' => null,
    'badge' => null,
    'active' => false,
    'name' => '',
])
<li class="menu-item{{ isset($active) && $active ? ' active open' : '' }}">
    <a href="javascript:void(0);" class="menu-link menu-toggle">
        @if ($icon)
            <i {{ $icon->attributes->class('menu-icon tf-icons') }}></i>
        @endif
        {{ $svg ?? '' }}
        <div class="text-truncate" data-i18n="Dashboards">{{ $name ?? '' }}</div>
        @if ($badge)
            <span {{ $badge->attributes->class('badge badge-center rounded-pill bg-danger ms-auto') }}>
                {{ $badge }}
            </span>
        @endif
    </a>
    <ul class="menu-sub">
        {{ $slot }}
    </ul>
</li>
