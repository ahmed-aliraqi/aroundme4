@props([
    'level' => 'success',
    'message' => session('status'),
])

@if (!empty($message))
    <div class="alert alert-{{ $level }}">
        {{ $message }}
    </div>
@endif
