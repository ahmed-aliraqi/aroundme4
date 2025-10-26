import { createApp, h } from 'vue';
import { i18nVue } from 'laravel-vue-i18n';

import Vuex from '@/store/index';
import '@/plugins/select2.js';
import Axios from '@/plugins/axios.js';
import Auth from '@/plugins/auth.js';
import AppLayout from '@/layouts/dashboard/App.vue';
import { Locale, Locales } from '@/plugins/locales';
import SweetAlert from '@/plugins/sweetalert.js';
import MapsPlugin from '@/plugins/maps.js';


import { createInertiaApp } from '@inertiajs/vue3'

const App = createInertiaApp({
    resolve: name => {

        const pages = import.meta.glob('../pages/**/*.vue', {eager: true})
        const page = pages[`../pages/${name}.vue`]

        if (page && page.default && page.default.layout === undefined) {
            page.default.layout = AppLayout
        }

        return page
    },
    setup({ el, App, props, plugin }) {
        createApp({ render: () => h(App, props) })
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
            .use(MapsPlugin)
            .use(SweetAlert)
            .provide('$locale', Locale)
            .provide('$locales', Locales)
            .provide('$axios', Axios)
            .mount(el)
    },
})

export default App;
