@props([
    'icon' => null,
    'svg' => null,
    'badge' => null,
    'active' => false,
    'name' => '',
    'link' => '',
])
<li class="menu-item{{ isset($active) && $active ? ' active' : '' }}">
    <a href="{{ $link ?? '' }}" class="menu-link">
        @if ($icon)
            <i {{ $icon->attributes->class('menu-icon tf-icons') }}></i>
        @endif
        {{ $svg ?? '' }}
        <div class="text-truncate">{{ $slot }}</div>
        @if ($badge)
            <span {{ $badge->attributes->class('badge badge-center rounded-pill bg-danger ms-auto') }}>
                {{ $badge }}
            </span>
        @endif
    </a>
</li>
