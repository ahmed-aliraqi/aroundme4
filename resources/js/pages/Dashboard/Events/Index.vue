<script setup>
    import { Head, Link } from '@inertiajs/vue3';
    import { useBreadcrumbs } from '@/composables/useBreadcrumbs';
    import { onMounted, ref, watch } from 'vue';
    import { trans } from 'laravel-vue-i18n';
    import FilterDropdown from '@/components/Tables/FilterDropdown.vue';
    import DeleteIcon from '@/components/Svgs/DeleteIcon.vue';
    import { route } from 'ziggy-js';
    import Pagination from '@/components/Tables/Pagination.vue';
    import { useCrud } from '@/composables/useCrud.js';
    import { useFilters } from '@/composables/useFilters.js';
    import EventCreateModal from '@/pages/Dashboard/Events/Modals/EventCreateModal.vue';
    import EventEditModal from '@/pages/Dashboard/Events/Modals/EventEditModal.vue';
    import EditIcon from '@/components/Svgs/EditIcon.vue';

    defineOptions({ name: 'EventsIndex' });

    const props = defineProps(['auth', 'app', 'events', 'query']);

    const { filter } = useFilters(props.query, 'dashboard.events.index');
    const {
        selected,
        selectAll,
        deleteSelected,
        deleteItem,
    } = useCrud({
        items: ref(props.events),
        resourceUrl: '/dashboard/events',
        resourceName: 'events',
    });

    const { setBreadcrumbs } = useBreadcrumbs();

    const updatedItem = ref(null);

    const openEditModal = (event) => {
        updatedItem.value = event
    }
    const closeEditModal = () => {
        updatedItem.value = null
    }

    onMounted(() => {
        setBreadcrumbs([
            { label: trans('sidebar.analytics'), href: '/' },
            { label: trans('events.plural') },
        ]);
    });

</script>

<template>
    <Head>
        <title>{{ $t('events.plural') }} | {{ app.name }}</title>
    </Head>

    <!-- Events List Table -->
    <div class="card">
        <div class="card-header border-bottom">
            <div class="d-flex justify-content-between align-items-center">
                <h5 class="card-title">
                    {{ $t('events.tracking') }} ({{ events.total }})
                    <small class="text-muted d-block mt-2">{{ $t('events.tracking_note') }}</small>
                </h5>

                <EventCreateModal></EventCreateModal>
            </div>
        </div>
        <div class="table-responsive">
            <table class="table">
                <thead>
                    <tr>
                        <td colspan="100">
                            <div class="row d-flex justify-content-between align-items-center">
                                <div class="col-8">
                                    <button
                                        class="btn btn-label-danger"
                                        :disabled="selected.length === 0"
                                        @click.prevent="deleteSelected"
                                    >
                                        <DeleteIcon
                                            width="18"
                                            height="18"
                                            class="me-2"
                                        ></DeleteIcon>
                                        {{ $t('events.actions.delete_selected') }}
                                    </button>
                                </div>
                                <div
                                    class="col-4 d-flex align-items-center justify-content-between gap-2"
                                >
                                    <div class="input-group input-group-merge">
                                        <span class="input-group-text" id="basic-addon-search31">
                                            <i class="icon-base bx bx-search"></i>
                                        </span>
                                        <input
                                            type="text"
                                            class="form-control"
                                            v-model="filter.q"
                                            :placeholder="$t('events.search')"
                                        />
                                    </div>

                                    <FilterDropdown>
                                        <h6 class="dropdown-header px-0 mb-2">
                                            {{ $t('events.attributes.type') }}
                                        </h6>
                                        <div class="form-check">
                                            <input
                                                class="form-check-input"
                                                type="checkbox"
                                                value="APP_USER"
                                                id="APP_USER"
                                                v-model="filter.type"
                                            />
                                            <label class="form-check-label" for="APP_USER">
                                                {{ $t('events.types.APP_USER') }}
                                            </label>
                                        </div>
                                        <div class="form-check">
                                            <input
                                                class="form-check-input"
                                                type="checkbox"
                                                value="USER"
                                                id="USER"
                                                v-model="filter.type"
                                            />
                                            <label class="form-check-label" for="USER">
                                                {{ $t('events.types.USER') }}
                                            </label>
                                        </div>
                                        <div class="form-check">
                                            <input
                                                class="form-check-input"
                                                type="checkbox"
                                                value="ADMIN"
                                                id="ADMIN"
                                                v-model="filter.type"
                                            />
                                            <label class="form-check-label" for="ADMIN">
                                                {{ $t('events.types.ADMIN') }}
                                            </label>
                                        </div>

                                        <hr class="dropdown-divider" />

                                        <h6 class="dropdown-header px-0 mb-2">
                                            {{ $t('events.perPage') }}
                                        </h6>
                                        <input
                                            class="form-control"
                                            type="number"
                                            min="1"
                                            v-model="filter.perPage"
                                        />

                                        <hr class="dropdown-divider" />
                                        <h6 class="dropdown-header px-0 mb-2">
                                            {{ $t('events.attributes.email') }}
                                        </h6>
                                        <input
                                            class="form-control"
                                            type="text"
                                            min="1"
                                            v-model="filter.email"
                                        />
                                    </FilterDropdown>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr class="table-active">
                        <td style="width: 40px">
                            <div class="form-check">
                                <input
                                    class="form-check-input"
                                    type="checkbox"
                                    @change="selectAll($event.target.checked, [auth.event.id])"
                                    id="selectAll"
                                />
                            </div>
                        </td>
                        <th>{{ $t('events.attributes.name') }}</th>
                        <th>{{ $t('events.attributes.date') }}</th>
                        <th>{{ $t('events.attributes.location') }}</th>
                        <th>{{ $t('events.attributes.actions') }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="event in events.data"
                        :class="{ 'bg-label-primary': selected.includes(event.id) }"
                    >
                        <td>
                            <div class="form-check">
                                <input
                                    class="form-check-input"
                                    multiple
                                    name="items[]"
                                    v-model="selected"
                                    type="checkbox"
                                    :value="event.id"
                                    :disabled="auth.event.id === event.id"
                                />
                            </div>
                        </td>
                        <td>
                            <div class="d-flex justify-content-start align-items-center event-name">
                                <div class="avatar-wrapper">
                                    <div class="avatar avatar-sm me-4">
                                        <img
                                            :src="event.avatar"
                                            :alt="event.name"
                                            class="rounded-circle"
                                        />
                                    </div>
                                </div>
                                <div class="d-flex flex-column">
                                    <Link
                                        :href="route('dashboard.events.show', event)"
                                        class="text-heading text-truncate"
                                    >
                                        <span class="fw-medium">{{ event.name }}</span>
                                    </Link>
                                    <small>{{ event.email }}</small>
                                </div>
                            </div>
                        </td>
                        <td>{{ event.phone }}</td>
                        <td>{{ event.created_at }}</td>
                        <td>
                            <div class="d-flex gap-3">
<!--                                <Link-->
<!--                                    :href="route('dashboard.events.show', event)"-->
<!--                                    class="text-muted"-->
<!--                                >-->
<!--                                    <EyeIcon width="20" height="20"></EyeIcon>-->
<!--                                </Link>-->
                                <a
                                    href="#"
                                    @click.prevent="openEditModal(event)"
                                    class="text-muted"
                                >
                                    <EditIcon width="20" height="20"></EditIcon>
                                </a>
                                <a
                                    href="#"
                                    class="text-danger"
                                    @click.prevent="deleteItem(event.id)"
                                    v-if="auth.event.id !== event.id"
                                >
                                    <DeleteIcon width="20" height="20"></DeleteIcon>
                                </a>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="card-footer">
            <Pagination v-if="events" :data="events" />
        </div>

        <EventEditModal v-if="updatedItem" :item="updatedItem" @close-modal="closeEditModal"></EventEditModal>
    </div>
</template>
