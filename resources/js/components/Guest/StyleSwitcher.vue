<script setup>
    import { useTheme } from '@/composables/useTheme.js';

    const {theme, applyTheme } = useTheme();
</script>

<template>
    <button
        class="btn dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false">
        <i v-if="theme === 'light'" class="bx bx-sun bx-sm"></i>
        <i v-if="theme === 'dark'" class="bx bx-moon bx-sm"></i>
        <i v-if="theme === 'system'" class="bx bx-desktop bx-sm"></i>
    </button>
    <ul class="dropdown-menu">
        <li>
            <a class="dropdown-item" :class="{active: theme === 'light'}" href="javascript:void(0);" @click.prevent="applyTheme('light')">
                <span class="align-middle"><i class="bx bx-sun me-2"></i>{{ $t('actions.mode.light') }}</span>
            </a>
        </li>
        <li>
            <a class="dropdown-item" :class="{active: theme === 'dark'}" href="javascript:void(0);" @click.prevent="applyTheme('dark')">
                <span class="align-middle"><i class="bx bx-moon me-2"></i>{{ $t('actions.mode.dark') }}</span>
            </a>
        </li>
        <li>
            <a class="dropdown-item" :class="{active: theme === 'system'}" href="javascript:void(0);" @click.prevent="applyTheme('system')">
                <span class="align-middle"><i class="bx bx-desktop me-2"></i>{{ $t('actions.mode.system') }}</span>
            </a>
        </li>
    </ul>
</template>

<style scoped>
    .dropdown-toggle::after {
        display: none;
    }
</style>
