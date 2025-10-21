<script setup>
    import { Head, Link, router, usePage } from '@inertiajs/vue3';
    import { useBreadcrumbs } from '@/composables/useBreadcrumbs';
    import { onMounted, ref, watch } from 'vue';
    import { trans } from 'laravel-vue-i18n';
    import FilterDropdown from '@/components/Tables/FilterDropdown.vue';
    import EditIcon from '@/components/Svgs/EditIcon.vue';
    import DeleteIcon from '@/components/Svgs/DeleteIcon.vue';
    import { route } from 'ziggy-js';
    import UserTypeBadge from '@/components/User/TypeBadge.vue';
    import Pagination from '@/components/Tables/Pagination.vue';
    import EyeIcon from '@/components/Svgs/EyeIcon.vue';
    import debounce from 'lodash/debounce';

    defineOptions({ name: 'UsersIndex' });

    const props = defineProps(['app', 'users', 'query']);

    const filter = ref({
        type: props.query?.type || [],
        perPage: props.query?.perPage || undefined,
        q: props.query?.q || ''
    });

    const updateQuery = debounce((value) => {
        router.get(
            route('dashboard.users.index'),
            value,
            { preserveState: true, replace: true }
        );
    }, 200);

    // Watch search and call debounced function
    watch(filter, (value) => {
        updateQuery(value);
    }, {deep: true});

    const selectAll = (checked) => {
        if (checked) {
            selectedItems.value = props.users.data.map((user) => user.id);
        } else {
            selectedItems.value = [];
        }
    };

    const selectedItems = ref([]);

    const applyFilters = () => {
        console.log(filter.value);
    };

    const { setBreadcrumbs } = useBreadcrumbs();

    onMounted(() => {
        console.log(router.params);
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
                    {{ $t('users.tracking') }}
                    <small class="text-muted d-block mt-2">{{ $t('users.tracking_note') }}</small>
                </h5>

                <a href="#" class="btn btn-primary">
                    <svg
                        width="20"
                        height="20"
                        class="me-1"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M9.99935 4.16797V15.8346M4.16602 10.0013H15.8327"
                            stroke="currentColor"
                            stroke-width="1.66667"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>

                    {{ $t('users.actions.create') }}
                </a>
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
                                        :disabled="selectedItems.length === 0"
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

                                    <FilterDropdown @apply="applyFilters">
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
                                    @change="selectAll($event.target.checked)"
                                    id="selectAll"
                                />
                            </div>
                        </td>
                        <th>{{ $t('users.attributes.name') }}</th>
                        <th>{{ $t('users.attributes.phone') }}</th>
                        <th>{{ $t('users.attributes.type') }}</th>
                        <th>{{ $t('users.attributes.last_active') }}</th>
                        <th>{{ $t('users.attributes.created_at') }}</th>
                        <th>{{ $t('users.attributes.actions') }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="user in users.data"
                        :class="{ 'bg-label-primary': selectedItems.includes(user.id) }"
                    >
                        <td>
                            <div class="form-check">
                                <input
                                    class="form-check-input"
                                    multiple
                                    name="items[]"
                                    v-model="selectedItems"
                                    type="checkbox"
                                    :value="user.id"
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
                        <td>3 min ago</td>
                        <td>Oct 10, 2024 ,10AM</td>
                        <td>
                            <div class="d-flex gap-3">
                                <Link
                                    :href="route('dashboard.users.show', user)"
                                    class="text-muted"
                                >
                                    <EyeIcon width="20" height="20"></EyeIcon>
                                </Link>
                                <Link
                                    :href="route('dashboard.users.edit', user)"
                                    class="text-muted"
                                >
                                    <EditIcon width="20" height="20"></EditIcon>
                                </Link>
                                <Link
                                    :href="route('dashboard.users.show', user)"
                                    class="text-danger"
                                >
                                    <DeleteIcon width="20" height="20"></DeleteIcon>
                                </Link>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="card-footer">
            <Pagination v-if="users" :data="users" />
        </div>
        <!-- Offcanvas to add new user -->
        <div
            class="offcanvas offcanvas-end"
            tabindex="-1"
            id="offcanvasAddUser"
            aria-labelledby="offcanvasAddUserLabel"
        >
            <div class="offcanvas-header">
                <h5 id="offcanvasAddUserLabel" class="offcanvas-title">Add User</h5>
                <button
                    type="button"
                    class="btn-close text-reset"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                ></button>
            </div>
            <div class="offcanvas-body mx-0 flex-grow-0">
                <form class="add-new-user pt-0" id="addNewUserForm" onsubmit="return false">
                    <div class="mb-3">
                        <label class="form-label" for="add-user-fullname">Full Name</label>
                        <input
                            type="text"
                            class="form-control"
                            id="add-user-fullname"
                            placeholder="John Doe"
                            name="userFullname"
                            aria-label="John Doe"
                        />
                    </div>
                    <div class="mb-3">
                        <label class="form-label" for="add-user-email">Email</label>
                        <input
                            type="text"
                            id="add-user-email"
                            class="form-control"
                            placeholder="john.doe@example.com"
                            aria-label="john.doe@example.com"
                            name="userEmail"
                        />
                    </div>
                    <div class="mb-3">
                        <label class="form-label" for="add-user-contact">Contact</label>
                        <input
                            type="text"
                            id="add-user-contact"
                            class="form-control phone-mask"
                            placeholder="+1 (609) 988-44-11"
                            aria-label="john.doe@example.com"
                            name="userContact"
                        />
                    </div>
                    <div class="mb-3">
                        <label class="form-label" for="add-user-company">Company</label>
                        <input
                            type="text"
                            id="add-user-company"
                            class="form-control"
                            placeholder="Web Developer"
                            aria-label="jdoe1"
                            name="companyName"
                        />
                    </div>
                    <div class="mb-3">
                        <label class="form-label" for="country">Country</label>
                        <select id="country" class="select2 form-select">
                            <option value="">Select</option>
                            <option value="Australia">Australia</option>
                            <option value="Bangladesh">Bangladesh</option>
                            <option value="Belarus">Belarus</option>
                            <option value="Brazil">Brazil</option>
                            <option value="Canada">Canada</option>
                            <option value="China">China</option>
                            <option value="France">France</option>
                            <option value="Germany">Germany</option>
                            <option value="India">India</option>
                            <option value="Indonesia">Indonesia</option>
                            <option value="Israel">Israel</option>
                            <option value="Italy">Italy</option>
                            <option value="Japan">Japan</option>
                            <option value="Korea">Korea, Republic of</option>
                            <option value="Mexico">Mexico</option>
                            <option value="Philippines">Philippines</option>
                            <option value="Russia">Russian Federation</option>
                            <option value="South Africa">South Africa</option>
                            <option value="Thailand">Thailand</option>
                            <option value="Turkey">Turkey</option>
                            <option value="Ukraine">Ukraine</option>
                            <option value="United Arab Emirates">United Arab Emirates</option>
                            <option value="United Kingdom">United Kingdom</option>
                            <option value="United States">United States</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label class="form-label" for="user-role">User Role</label>
                        <select id="user-role" class="form-select">
                            <option value="subscriber">Subscriber</option>
                            <option value="editor">Editor</option>
                            <option value="maintainer">Maintainer</option>
                            <option value="author">Author</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <div class="mb-4">
                        <label class="form-label" for="user-plan">Select Plan</label>
                        <select id="user-plan" class="form-select">
                            <option value="basic">Basic</option>
                            <option value="enterprise">Enterprise</option>
                            <option value="company">Company</option>
                            <option value="team">Team</option>
                        </select>
                    </div>
                    <button type="submit" class="btn btn-primary me-sm-3 me-1 data-submit">
                        Submit
                    </button>
                    <button
                        type="reset"
                        class="btn btn-label-secondary"
                        data-bs-dismiss="offcanvas"
                    >
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>
