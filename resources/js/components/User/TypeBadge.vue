<script setup>
    defineOptions({name: 'UserTypeBadge'})
    defineProps(['type'])
</script>

<template>
<span class="badge" :class="{
        'bg-label-primary': type === 'ADMIN',
        'bg-label-secondary': type === 'USER',
        'bg-label-warning': type === 'APP_USER'
    }">
    <span class="badge badge-dot me-1" :class="{
        'text-bg-primary': type === 'ADMIN',
        'text-bg-secondary': type === 'USER',
        'text-bg-warning': type === 'APP_USER'
    }"></span>
    {{ $t('users.types.' + type) }}
</span>
</template>
