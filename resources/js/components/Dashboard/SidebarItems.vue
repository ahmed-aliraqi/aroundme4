<script setup lang="ts">
    import SidebarHead from '@/components/Dashboard/SidebarHead.vue';
    import SidebarLink from '@/components/Dashboard/SidebarLink.vue';
    import UserGroupIcon from '@/components/Svgs/UserGroupIcon.vue';
    import CalendarIcon from '@/components/Svgs/CalendarIcon.vue';
    import { route } from 'ziggy-js';
    import { usePage } from '@inertiajs/vue3';

    const page = usePage();
    defineOptions({ name: 'SidebarItems' });
</script>

<template>
    <ul class="menu-inner py-1">
        <SidebarHead>{{ $t('sidebar.overview') }}</SidebarHead>

        <SidebarLink
            :label="$t('users.plural')"
            :href="route('dashboard.users.index')"
            :active="['Dashboard/Users/Index'].includes(page.component)"
        >
            <template #svg>
                <UserGroupIcon width="20" height="20" class="me-2"></UserGroupIcon>
            </template>
        </SidebarLink>
        <SidebarHead>{{ $t('sidebar.services') }}</SidebarHead>
        <SidebarLink
            :label="$t('events.plural')"
            :href="route('dashboard.events.index')"
            :active="['Dashboard/Events/Index'].includes(page.component)"
        >
            <template #svg>
                <CalendarIcon width="20" height="20" class="me-2"></CalendarIcon>
            </template>
        </SidebarLink>

    </ul>
</template>

<style scoped></style>
