<small class="d-block border-top border-1 border-light mt-3 pt-2">
    @foreach (Locales::get() as $locale)
        @if (app()->getLocale() == $locale->getCode())
            <span class="text-muted">
                <span class="mx-2">{{ $locale->getName() }}</span>
            </span>
        @else
            <a href="{{ route('locale.change', $locale->getCode()) }}">
                <span class="mx-2">{{ $locale->getName() }}</span>
            </a>
        @endif
        @if (!$loop->last)
            <span class="text-muted"> - </span>
        @endif
    @endforeach
</small>
