import { createApp, h } from 'vue';
import { i18nVue } from 'laravel-vue-i18n';

import Vuex from '@/store/index';
import Axios from '@/plugins/axios.js';
import Auth from '@/plugins/auth.js';
import AppLayout from '@/layouts/dashboard/App.vue';
import { Locale } from '@/plugins/locales';
// import BootstrapForms from 'vue3-bootstrap5-forms';


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
            .provide('$locale', Locale)
            .provide('$axios', Axios)
            .mount(el)
    },
})

export default App;
