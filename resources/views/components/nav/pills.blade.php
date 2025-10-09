@props([
    'class' => 'nav nav-pills flex-md-row flex-column mb-3',
])
<ul class="{{ $class }}" {{ $attributes }}>
    {{ $slot }}
</ul>
