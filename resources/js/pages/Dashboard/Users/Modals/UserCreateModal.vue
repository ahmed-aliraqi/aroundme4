<script setup>
    import { useForm } from '@/plugins/useForm.js';
    import { route } from 'ziggy-js';
    import toast from '@/plugins/tostify.js';
    import { onMounted, ref } from 'vue';
    import BsInput from '@/components/Form/BsInput.vue';
    import BsInputPhone from '@/components/Form/BsInputPhone.vue';
    import UserStarIcon from '@/components/Svgs/UserStarIcon.vue';
    import UserSettingsIcon from '@/components/Svgs/UserSettingsIcon.vue';
    import UserIcon from '@/components/Svgs/UserIcon.vue';
    import { usePage } from '@inertiajs/vue3';

    defineOptions({ name: 'UserCreateModal' });

    const page = usePage();

    const modal = ref(null);

    const form = useForm({
        name: '',
        email: '',
        phone: '',
        type: 'USER',
        password: '',
        password_confirmation: '',
    });

    onMounted(() => {
        const modalEl = document.getElementById('createModal');
        modal.value = window.bootstrap.Modal.getInstance(modalEl) || new window.bootstrap.Modal(modalEl);
    });
    const submit = () => {
        let validator = form.validate({
            name: 'required|max:255',
            email: 'required|max:255',
            phone: 'required',
            type: 'required',
            password: 'required|confirmed',
        });

        if (validator.fails()) {
            return;
        }

        form.post(route('dashboard.users.store'), {
            onFinish: () => {
                modal.value.hide();
                form.reset();
                toast(page.props.flash?.message);
            },
        });
    };
</script>

<template>
    <!-- Button trigger modal -->
    <button type="button" class="btn btn-primary" @click.prevent="modal.show">
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
    </button>

    <!-- Modal -->
    <div
        class="modal fade"
        id="createModal"
        tabindex="-1"
        aria-labelledby="createModalLabel"
        data-bs-backdrop="static"
        aria-hidden="true"
    >
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="createModalLabel">
                        {{ $t('users.actions.create') }}
                    </h5>
                    <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    ></button>
                </div>
                <div class="modal-body">
                    <form action="" @submit.prevent="submit" id="create-form">
                        <BsInput
                            resource="users"
                            type="text"
                            name="name"
                            v-model="form.name"
                            :error="form.errors.name"
                        ></BsInput>
                        <BsInput
                            resource="users"
                            type="text"
                            name="email"
                            v-model="form.email"
                            :error="form.errors.email"
                        ></BsInput>
                        <BsInputPhone
                            resource="users"
                            name="phone"
                            v-model="form.phone"
                            :error="form.errors.phone"
                        ></BsInputPhone>
                        <div class="row">
                            <div class="col-4">
                                <div class="form-check custom-option custom-option-icon">
                                    <label
                                        class="form-check-label custom-option-content"
                                        for="ADMIN"
                                    >
                                        <span class="custom-option-body">
                                            <UserStarIcon width="28" height="28"></UserStarIcon>
                                            <span class="custom-option-title">
                                                {{ $t('users.types.ADMIN') }}
                                            </span>
                                        </span>
                                        <input
                                            v-model="form.type"
                                            class="form-check-input"
                                            type="radio"
                                            value="ADMIN"
                                            id="ADMIN"
                                        />
                                    </label>
                                </div>
                            </div>
                            <div class="col-4">
                                <div class="form-check custom-option custom-option-icon">
                                    <label
                                        class="form-check-label custom-option-content"
                                        for="USER"
                                    >
                                        <span class="custom-option-body">
                                            <UserSettingsIcon
                                                width="28"
                                                height="28"
                                            ></UserSettingsIcon>
                                            <span class="custom-option-title">
                                                {{ $t('users.types.USER') }}
                                            </span>
                                        </span>
                                        <input
                                            v-model="form.type"
                                            class="form-check-input"
                                            type="radio"
                                            value="USER"
                                            id="USER"
                                        />
                                    </label>
                                </div>
                            </div>
                            <div class="col-4">
                                <div class="form-check custom-option custom-option-icon">
                                    <label
                                        class="form-check-label custom-option-content"
                                        for="APP_USER"
                                    >
                                        <span class="custom-option-body">
                                            <UserIcon width="28" height="28"></UserIcon>
                                            <span class="custom-option-title">
                                                {{ $t('users.types.APP_USER') }}
                                            </span>
                                        </span>
                                        <input
                                            v-model="form.type"
                                            class="form-check-input"
                                            type="radio"
                                            value="APP_USER"
                                            id="APP_USER"
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>

                        <BsInput
                            resource="users"
                            type="password"
                            name="password"
                            v-model="form.password"
                            :error="form.errors.password"
                        ></BsInput>

                        <BsInput
                            resource="users"
                            type="password"
                            name="password_confirmation"
                            v-model="form.password_confirmation"
                            :error="form.errors.password_confirmation"
                        ></BsInput>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                        {{ $t('actions.cancel') }}
                    </button>
                    <button
                        v-if="form.processing"
                        type="button"
                        disabled
                        form="create-form"
                        class="btn btn-primary"
                    >
                        <div class="spinner-border me-2" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                        {{ $t('actions.saving') }}
                    </button>
                    <button v-else type="submit" form="create-form" class="btn btn-primary">
                        {{ $t('actions.save') }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
