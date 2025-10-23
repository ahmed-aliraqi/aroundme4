<script setup>
    import { Head, Link } from '@inertiajs/vue3';
    import { useBreadcrumbs } from '@/composables/useBreadcrumbs';
    import { onMounted, ref, watch } from 'vue';
    import { trans } from 'laravel-vue-i18n';
    import FilterDropdown from '@/components/Tables/FilterDropdown.vue';
    import DeleteIcon from '@/components/Svgs/DeleteIcon.vue';
    import { route } from 'ziggy-js';
    import UserTypeBadge from '@/components/User/TypeBadge.vue';
    import Pagination from '@/components/Tables/Pagination.vue';
    import { useCrud } from '@/composables/useCrud.js';
    import { useFilters } from '@/composables/useFilters.js';
    import UserCreateModal from '@/pages/Dashboard/Users/Modals/UserCreateModal.vue';
    import UserEditModal from '@/pages/Dashboard/Users/Modals/UserEditModal.vue';
    import EditIcon from '@/components/Svgs/EditIcon.vue';

    defineOptions({ name: 'UsersIndex' });

    const props = defineProps(['auth', 'app', 'users', 'query']);

    const { filter } = useFilters(props.query, 'dashboard.users.index');
    const {
        selected,
        selectAll,
        deleteSelected,
        deleteItem,
    } = useCrud({
        items: ref(props.users),
        resourceUrl: '/dashboard/users',
        resourceName: 'users',
    });

    const { setBreadcrumbs } = useBreadcrumbs();

    const updatedItem = ref(null);

    const openEditModal = (user) => {
        updatedItem.value = user
    }
    const closeEditModal = () => {
        updatedItem.value = null
    }

    onMounted(() => {
        setBreadcrumbs([
            { label: trans('sidebar.analytics'), href: '/' },
            { label: trans('users.plural') },
        ]);
    });

</script>

<template>
    <Head>
        <title>{{ $t('users.plural') }} | {{ app.name }}</title>
    </Head>

    <!-- Users List Table -->
    <div class="card">
        <div class="card-header border-bottom">
            <div class="d-flex justify-content-between align-items-center">
                <h5 class="card-title">
                    {{ $t('users.tracking') }} ({{ users.total }})
                    <small class="text-muted d-block mt-2">{{ $t('users.tracking_note') }}</small>
                </h5>

                <UserCreateModal></UserCreateModal>
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
                                        {{ $t('users.actions.delete_selected') }}
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
                                            :placeholder="$t('users.search')"
                                        />
                                    </div>

                                    <FilterDropdown>
                                        <h6 class="dropdown-header px-0 mb-2">
                                            {{ $t('users.attributes.type') }}
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
                                                {{ $t('users.types.APP_USER') }}
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
                                                {{ $t('users.types.USER') }}
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
                                                {{ $t('users.types.ADMIN') }}
                                            </label>
                                        </div>

                                        <hr class="dropdown-divider" />

                                        <h6 class="dropdown-header px-0 mb-2">
                                            {{ $t('users.perPage') }}
                                        </h6>
                                        <input
                                            class="form-control"
                                            type="number"
                                            min="1"
                                            v-model="filter.perPage"
                                        />

                                        <hr class="dropdown-divider" />
                                        <h6 class="dropdown-header px-0 mb-2">
                                            {{ $t('users.attributes.email') }}
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
                                    @change="selectAll($event.target.checked, [auth.user.id])"
                                    id="selectAll"
                                />
                            </div>
                        </td>
                        <th>{{ $t('users.attributes.name') }}</th>
                        <th>{{ $t('users.attributes.phone') }}</th>
                        <th>{{ $t('users.attributes.type') }}</th>
                        <th>{{ $t('users.attributes.created_at') }}</th>
                        <th>{{ $t('users.attributes.actions') }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="user in users.data"
                        :class="{ 'bg-label-primary': selected.includes(user.id) }"
                    >
                        <td>
                            <div class="form-check">
                                <input
                                    class="form-check-input"
                                    multiple
                                    name="items[]"
                                    v-model="selected"
                                    type="checkbox"
                                    :value="user.id"
                                    :disabled="auth.user.id === user.id"
                                />
                            </div>
                        </td>
                        <td>
                            <div class="d-flex justify-content-start align-items-center user-name">
                                <div class="avatar-wrapper">
                                    <div class="avatar avatar-sm me-4">
                                        <img
                                            :src="user.avatar"
                                            :alt="user.name"
                                            class="rounded-circle"
                                        />
                                    </div>
                                </div>
                                <div class="d-flex flex-column">
                                    <Link
                                        :href="route('dashboard.users.show', user)"
                                        class="text-heading text-truncate"
                                    >
                                        <span class="fw-medium">{{ user.name }}</span>
                                    </Link>
                                    <small>{{ user.email }}</small>
                                </div>
                            </div>
                        </td>
                        <td>{{ user.phone }}</td>
                        <td>
                            <UserTypeBadge :type="user.type"></UserTypeBadge>
                        </td>
                        <td>{{ user.created_at }}</td>
                        <td>
                            <div class="d-flex gap-3">
<!--                                <Link-->
<!--                                    :href="route('dashboard.users.show', user)"-->
<!--                                    class="text-muted"-->
<!--                                >-->
<!--                                    <EyeIcon width="20" height="20"></EyeIcon>-->
<!--                                </Link>-->
                                <a
                                    href="#"
                                    @click.prevent="openEditModal(user)"
                                    class="text-muted"
                                >
                                    <EditIcon width="20" height="20"></EditIcon>
                                </a>
                                <a
                                    href="#"
                                    class="text-danger"
                                    @click.prevent="deleteItem(user.id)"
                                    v-if="auth.user.id !== user.id"
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
            <Pagination v-if="users" :data="users" />
        </div>

        <UserEditModal v-if="updatedItem" :item="updatedItem" @close-modal="closeEditModal"></UserEditModal>
    </div>
</template>
