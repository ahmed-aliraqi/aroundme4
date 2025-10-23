<script setup>
    import { useForm } from '@/plugins/useForm.js';
    import { route } from 'ziggy-js';
    import toast from '@/plugins/tostify.js';
    import { onMounted, ref, watch } from 'vue';
    import BsInput from '@/components/Form/BsInput.vue';
    import BsInputPhone from '@/components/Form/BsInputPhone.vue';
    import UserStarIcon from '@/components/Svgs/UserStarIcon.vue';
    import UserSettingsIcon from '@/components/Svgs/UserSettingsIcon.vue';
    import UserIcon from '@/components/Svgs/UserIcon.vue';
    import { router, usePage } from '@inertiajs/vue3';

    defineOptions({ name: 'UserEditModal' });

    const emit = defineEmits(['closeModal'])

    const page = usePage();
    const props = defineProps(['item']);

    const modal = ref(null);

    const form = useForm({
        name: props.item.name,
        email: props.item.email,
        phone: props.item.phone,
        type: props.item.type,
        password: '',
        password_confirmation: '',
    });

    onMounted(() => {
        const modalEl = document.getElementById(`item-update-${props.item.id}`);
        modal.value = window.bootstrap.Modal.getInstance(modalEl) || new window.bootstrap.Modal(modalEl);

        modal.value.show()
    });
    const submit = () => {
        let validator = form.validate({
            name: 'required|max:255',
            email: 'required|max:255',
            phone: 'required',
            type: 'required',
            password: 'confirmed',
        });

        if (validator.fails()) {
            return;
        }

        form.put(route('dashboard.users.update', props.item), {
            onFinish: () => {
                closeModal()
                form.reset();
                toast(page.props.flash?.message);

                router.reload()
            },
        });
    };

    const closeModal = () => {
        modal.value.hide()

        emit('closeModal')
    }

    watch(() => props.item, (value) => {
        if (value) {
            modal.value.show();
        } else {
            modal.value.hide();
        }
    })
</script>

<template>
    <!-- Modal -->
    <div
        class="modal fade"
        :id="`item-update-${item.id}`"
        tabindex="-1"
        :aria-labelledby="`item-update-label${item.id}`"
        data-bs-backdrop="static"
        aria-hidden="true"
    >
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" :id="`item-update-label${item.id}`">
                        {{ $t('users.actions.edit') }}
                    </h5>
                    <button
                        type="button"
                        class="btn-close"
                        @click.prevent="closeModal"
                    ></button>
                </div>
                <div class="modal-body">
                    <form action="" @submit.prevent="submit" :id="`update-form${item.id}`">
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
                                <div class="form-check custom-option custom-option-icon" :class="{checked: form.type === 'ADMIN'}">
                                    <label
                                        class="form-check-label custom-option-content"
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
                                        />
                                    </label>
                                </div>
                            </div>
                            <div class="col-4">
                                <div class="form-check custom-option custom-option-icon" :class="{checked: form.type === 'USER'}">
                                    <label class="form-check-label custom-option-content">
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
                                        />
                                    </label>
                                </div>
                            </div>
                            <div class="col-4">
                                <div class="form-check custom-option custom-option-icon" :class="{checked: form.type === 'APP_USER'}">
                                    <label class="form-check-label custom-option-content">
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
                    <button type="button" class="btn btn-secondary" @click.prevent="closeModal">
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
                    <button v-else type="submit" :form="`update-form${item.id}`" class="btn btn-primary">
                        {{ $t('actions.save') }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
