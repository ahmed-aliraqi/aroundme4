<div class="card card-{{ $color ?? 'secondary' }} card-outline mb-4">
    @if (isset($title) || isset($tools))
        <div class="card-header">
            <h3 class="card-title m-0">{{ $title ?? '' }}</h3>

            <div class="card-tools">
                {{ $tools ?? '' }}
            </div>
        </div>
    @endif

    <div class="card-body {{ $bodyClass ?? '' }}">
        {{ $slot }}
    </div>

    @isset($footer)
        <div class="card-footer">
            {{ $footer }}
        </div>
    @endisset
</div>
<!-- /.card -->
