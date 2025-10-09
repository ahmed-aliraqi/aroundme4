@props([
    'level' => 'danger',
    'bag' => 'default',
    'errors',
])

@if ($errors->{$bag}->any())
    <div class="alert alert-danger">
        <ul>
            @foreach ($errors->{$bag}->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
@endif
