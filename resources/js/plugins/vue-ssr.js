import { i18nVue } from 'laravel-vue-i18n';
import Vuex from '@/store/index';
import Axios from '@/plugins/axios.js';
import Auth from '@/plugins/auth.js';
import AppLayout from '@/layouts/dashboard/App.vue';
import { Locale } from '@/plugins/locales';
import { createInertiaApp } from '@inertiajs/vue3';
import createServer from '@inertiajs/vue3/server';
import { renderToString } from '@vue/server-renderer';
import { createSSRApp, h } from 'vue';
import SweetAlert from '@/plugins/sweetalert.js';


createServer((page) =>
    createInertiaApp({
        page,
        render: renderToString,
        resolve: (name) => {
            const pages = import.meta.glob('../pages/**/*.vue', { eager: true });
            const page = pages[`../pages/${name}.vue`];

            if (page && page.default && page.default.layout === undefined) {
                page.default.layout = AppLayout;
            }


            return page;
        },
        setup({ App, props, plugin, el }) {
            return createSSRApp({
                render: () => h(App, props),
            })
                .use(plugin)
                .use(i18nVue, {
                    lang: Locale.getCode(),
                    resolve: lang => {
                        const langs = import.meta.glob('../../../lang/*.json', { eager: true });
                        return langs[`../../../lang/${lang}.json`].default;
                    },
                })
                .use(Vuex)
                .use(Auth)
                .use(SweetAlert)
                .provide('$locale', Locale)
                .provide('$axios', Axios)
        },
    })
);
