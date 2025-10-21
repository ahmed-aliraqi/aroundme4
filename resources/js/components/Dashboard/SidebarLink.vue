<script setup>
import { Link } from '@inertiajs/vue3';

defineOptions({name: 'SidebarLink'})

const props = defineProps({
    type: {
        type: String,
        required: false,
        default: 'link'
    },
    href: {
        type: String,
        required: false,
        default: '#'
    },
    label: {
        type: String,
        required: true,
    },
    iconClass: {
        type: String,
        required: false,
    },
    active: {
        type: Boolean,
        required: false,
        default: false
    },
    badge: {
        type: Number,
        required: false,
        default: 0
    }
})
</script>

<template>
    <li class="menu-item" :class="{'active open': active && type === 'dropdown', active: active && type === 'link'}">
        <Link :href="href" class="menu-link" :class="{'menu-toggle': type === 'dropdown'}">
            <i v-if="iconClass" class="menu-icon tf-icons" :class="iconClass"></i>
            <slot name="svg"></slot>
            <div class="text-truncate">{{ label }}</div>
            <span v-if="badge > 0" :title="badge > 99 ? badge : ''" class="badge bg-label-danger ms-auto">{{ badge > 99 ? '+99' : badge }}</span>
        </Link>
        <ul class="menu-sub">
            <slot></slot>
        </ul>
    </li>
</template>
