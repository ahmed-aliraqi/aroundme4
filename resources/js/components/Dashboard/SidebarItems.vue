<script setup lang="ts">
    import SidebarHead from '@/components/Dashboard/SidebarHead.vue';
    import SidebarLink from '@/components/Dashboard/SidebarLink.vue';
    import UserGroupIcon from '@/components/Svgs/UserGroupIcon.vue';
    import PoisIcon from '@/components/Svgs/PoisIcon.vue';
    import PoiRequestsIcon from '@/components/Svgs/PoiRequestsIcon.vue';
    import BusinessRequestsIcon from '@/components/Svgs/BusinessRequestsIcon.vue';
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
            :label="$t('sidebar.pois')"
            :href="route('dashboard.pois.index')"
            :active="['Dashboard/Pois/Index'].includes(page.component)"
        >
            <template #svg>
                <PoisIcon width="20" height="20" class="me-2"></PoisIcon>
            </template>
        </SidebarLink>
        <SidebarLink
            :label="$t('sidebar.poi_requests')"
            :href="route('dashboard.poi_requests.index')"
            :active="['Dashboard/PoiRequests/Index'].includes(page.component)"
        >
            <template #svg>
                <PoiRequestsIcon width="20" height="20" class="me-2"></PoiRequestsIcon>
            </template>
        </SidebarLink>
        <SidebarLink
            :label="$t('sidebar.business_requests')"
            :href="route('dashboard.business_requests.index')"
            :active="['Dashboard/BusinessRequests/Index'].includes(page.component)"
        >
            <template #svg>
                <BusinessRequestsIcon width="20" height="20" class="me-2"></BusinessRequestsIcon>
            </template>
        </SidebarLink>
    </ul>
</template>

<style scoped></style>
