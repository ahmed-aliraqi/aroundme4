<script setup>
import Guest from '@/layouts/Guest.vue';
import BsInput from '@/components/Form/BsInput.vue';
import {route} from "ziggy-js";
import { useForm } from '@/plugins/useForm.js';
import { Head, Link } from '@inertiajs/vue3';
import { inject } from 'vue';
import StyleSwitcher from '@/components/Guest/StyleSwitcher.vue';

const props = defineProps(['app', 'config', 'flash', 'email', 'token'])
defineOptions({
    name: 'ResetPassword',
    layout: Guest,
})

const locales = inject('$locales');

const form = useForm({
    email: props.email,
    token: props.token,
    password: '',
    password_confirmation: '',
});

const submit = () => {
    form.post(route('password.store'), {
        onFinish: () => {
            form.reset('password', 'password_confirmation');
        },
    });
};

const setLocale = (locale) => {
    locales.setLocale(locale.getCode());
}
</script>

<template>
    <Head>
        <title>{{ $t('auth.reset_password.page_title') }} | {{ app.name }}</title>
    </Head>
    <div class="authentication-inner row m-0">
        <!-- /Left Text -->
        <div class="d-none d-lg-flex col-lg-7 col-xl-8 align-items-center p-5">
            <div class="w-100 d-flex justify-content-center">
                <img
                    :src="config.banner"
                    class="img-fluid"
                    alt="Reset Password image"
                    width="700"/>
            </div>
        </div>
        <!-- /Left Text -->

        <!-- Reset Password -->
        <div class="d-flex col-12 col-lg-5 col-xl-4 align-items-center authentication-bg p-sm-5 p-4">
            <div class="w-px-400 mx-auto">
                <!-- Logo -->

                <div class="app-brand mb-5">
                    <Link :href="route('dashboard.home')" class="app-brand-link gap-2">
                        <span class="app-brand-logo demo" v-if="app.logo">
                            <img :src="app.logo" class="mw-100" style="height: 60px;" :alt="app.name">
                        </span>
                        <span class="app-brand-text demo text-body fw-bold text-uppercase">{{ app.name }}</span>
                    </Link>
                </div>
                <!-- /Logo -->
                <h4 class="mb-2">{{ $t('auth.reset_password.title', {app: app.name}) }}</h4>
                <p class="mb-4">{{ $t('auth.reset_password.subtitle') }}</p>

                <form @submit.prevent="submit" id="formAuthentication" class="mb-3" action="" method="POST">
                    <BsInput
                        resource="auth.reset_password"
                        type="text"
                        name="email"
                        v-model="form.email"
                        :error="form.errors.email"></BsInput>

                    <BsInput
                        resource="auth.register"
                        type="password"
                        name="password"
                        v-model="form.password"
                        autofocus
                        :error="form.errors.password"></BsInput>

                    <BsInput
                        resource="auth.register"
                        type="password"
                        name="password_confirmation"
                        v-model="form.password_confirmation"
                        :error="form.errors.password_confirmation"></BsInput>

                    <button type="submit" class="btn btn-primary d-grid w-100" :disabled="form.processing">
                        {{ $t('auth.reset_password.actions.submit') }}
                    </button>
                </form>

                <p class="text-center">
                    <Link :href="route('login')">
                        <span>{{ $t('auth.reset_password.actions.login') }}</span>
                    </Link>
                </p>
                <p class="text-center">
                    <template v-for="locale in locales.get()">
                        <span v-if="locales.current().getCode() === locale.getCode()" class="text-muted d-inline-block me-2">
                            <span class="me-1" v-html="locale.getSvgFlag(20, 20)"></span>
                            {{ locale.getName() }}
                        </span>
                        <a v-else class="d-inline-block me-2" @click.prevent="setLocale(locale)" :href="route('locale.change', locale.getCode())">
                            <span class="me-1" v-html="locale.getSvgFlag(20,20)"></span>
                            {{ locale.getName() }}
                        </a>
                    </template>
                </p>
                <div class="text-center">
                    <StyleSwitcher></StyleSwitcher>
                </div>

            </div>
        </div>
        <!-- /Reset Password -->
    </div>
</template>
