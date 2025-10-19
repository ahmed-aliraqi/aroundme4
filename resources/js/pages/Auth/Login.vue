<script setup>
import Guest from '@/layouts/Guest.vue';
import BsInput from '@/components/Form/BsInput.vue';
import BsCheckbox from '@/components/Form/BsCheckbox.vue';
import {route} from "ziggy-js";
import { useForm } from '@/plugins/useForm.js';
import { Head, Link } from '@inertiajs/vue3';
import { inject } from 'vue';
import StyleSwitcher from '@/components/Guest/StyleSwitcher.vue';

const props = defineProps(['app', 'config'])
defineOptions({
    name: 'Login',
    layout: Guest,
})

const locales = inject('$locales');

const form = useForm({
    email: '',
    password: '',
    remember: false,
});

const submit = () => {
    const validator = form.validate({
        email: 'required|email',
        password: 'required',
    });

    if (validator.fails()) {
        return;
    }

    form.post(route('login'), {
        onSuccess: () => {
            form.reset('password');
        },
    });
};

const setLocale = (locale) => {
    locales.setLocale(locale.getCode());
}
</script>

<template>
    <Head>
        <title>{{ $t('auth.login.page_title') }} | {{ app.name }}</title>
    </Head>
    <div class="authentication-inner row m-0">
        <!-- /Left Text -->
        <div class="d-none d-lg-flex col-lg-7 col-xl-8 align-items-center p-5">
            <div class="w-100 d-flex justify-content-center">
                <img
                    :src="config.banner"
                    class="img-fluid"
                    alt="Login image"
                    width="700"/>
            </div>
        </div>
        <!-- /Left Text -->

        <!-- Login -->
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
                <h4 class="mb-2">{{ $t('auth.login.title', {app: app.name}) }}</h4>
                <p class="mb-4">{{ $t('auth.login.subtitle') }}</p>

                <form @submit.prevent="submit" id="formAuthentication" class="mb-3" action="" method="POST">
                    <BsInput
                        resource="auth.login"
                        type="text"
                        name="email"
                        v-model="form.email"
                        autofocus
                        :error="form.errors.email"></BsInput>

                    <BsInput
                        resource="auth.login"
                        type="password"
                        name="password"
                        v-model="form.password"
                        :error="form.errors.password" v-slot:label="{ label }">
                        <div class="d-flex justify-content-between">
                            <label class="form-label" for="password">{{ label }}</label>
                            <Link :href="route('password.request')">
                                <small>{{ $t('auth.login.actions.forget') }}</small>
                            </Link>
                        </div>
                    </BsInput>

                    <BsCheckbox
                        resource="auth.login"
                        name="remember"
                        v-model="form.remember"
                        :error="form.errors.remember"></BsCheckbox>

                    <button type="submit" class="btn btn-primary d-grid w-100" :disabled="form.processing">
                        {{ $t('auth.login.actions.submit') }}
                    </button>
                </form>

                <p class="text-center" v-if="config.register">
                    <span>{{ $t('auth.login.actions.register-note') }}&nbsp;&nbsp;</span>
                    <Link :href="route('register')">
                        <span>{{ $t('auth.login.actions.register') }}</span>
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
        <!-- /Login -->
    </div>
</template>
