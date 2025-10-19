<script setup>
    import Guest from '@/layouts/Guest.vue';
    import { route } from 'ziggy-js';
    import { Head, Link, router } from '@inertiajs/vue3';
    import { inject } from 'vue';
    import { trans, trans as $t } from 'laravel-vue-i18n';
    import StyleSwitcher from '@/components/Guest/StyleSwitcher.vue';
    import toast from '@/plugins/tostify.js';

    const props = defineProps(['app', 'config', 'flash']);
    defineOptions({
        name: 'VerifyEmail',
        layout: Guest,
    });

    const locales = inject('$locales');

    const setLocale = (locale) => {
        locales.setLocale(locale.getCode());
    };

    const resend = () => {
        router.post(
            route('verification.send'),
            {},
            {
                onSuccess: () => {
                    if (props.flash.status === 'verification-link-sent') {
                        toast(trans('auth.verify_email.messages.sent'));
                    }
                },
            }
        );
    };
</script>

<template>
    <Head>
        <title>{{ $t('auth.verify_email.page_title') }} | {{ app.name }}</title>
    </Head>
    <div class="authentication-inner row m-0">
        <!-- /Left Text -->
        <div class="d-none d-lg-flex col-lg-7 col-xl-8 align-items-center p-5">
            <div class="w-100 d-flex justify-content-center">
                <img :src="config.banner" class="img-fluid" alt="Login image" width="700" />
            </div>
        </div>
        <!-- /Left Text -->

        <!-- Login -->
        <div
            class="d-flex col-12 col-lg-5 col-xl-4 align-items-center authentication-bg p-sm-5 p-4"
        >
            <div class="w-px-400 mx-auto">
                <!-- Logo -->

                <div class="app-brand mb-5">
                    <Link :href="route('dashboard.home')" class="app-brand-link gap-2">
                        <span class="app-brand-logo demo" v-if="app.logo">
                            <img
                                :src="app.logo"
                                class="mw-100"
                                style="height: 60px"
                                :alt="app.name"
                            />
                        </span>
                        <span class="app-brand-text demo text-body fw-bold text-uppercase">
                            {{ app.name }}
                        </span>
                    </Link>
                </div>
                <!-- /Logo -->
                <h3 class="mb-2">{{ $t('auth.verify_email.title') }}</h3>
                <p class="text-start">
                    {{ $t('auth.verify_email.subtitle') }}
                </p>
                <a
                    class="btn btn-primary w-100 my-3"
                    href="javascript:void(0);"
                    @click.prevent="resend"
                >
                    {{ $t('auth.verify_email.actions.send') }}
                </a>

                <p class="text-center">
                    <Link :href="route('logout')">
                        <span>{{ $t('auth.logout') }}</span>
                    </Link>
                </p>
                <p class="text-center">
                    <template v-for="locale in locales.get()">
                        <span
                            v-if="locales.current().getCode() === locale.getCode()"
                            class="text-muted d-inline-block me-2"
                        >
                            <span class="me-1" v-html="locale.getSvgFlag(20, 20)"></span>
                            {{ locale.getName() }}
                        </span>
                        <a
                            v-else
                            class="d-inline-block me-2"
                            @click.prevent="setLocale(locale)"
                            :href="route('locale.change', locale.getCode())"
                        >
                            <span class="me-1" v-html="locale.getSvgFlag(20, 20)"></span>
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
