@props(['href', 'method' => 'POST'])

<form action="{{ $href }}" method="{{ $method }}" class="d-none" id="{{ md5($href) }}">
    @csrf
</form>

<a href="{{ $href }}" onclick="document.getElementById('{{ md5($href) }}').submit(); return false;"
    {{ $attributes }}>{{ $slot }}</a>
