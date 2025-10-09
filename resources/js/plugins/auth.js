export default {
    install: (app, options) => {
        app.config.globalProperties.$auth = {
            user() {
                return app.config.globalProperties.$store.getters['auth/getAuthUser'];
            },
            check() {
                return !!this.user();
            },
            async fetch() {
                return await app.config.globalProperties.$store.dispatch('auth/fetchAuthUser');
            },
            async logout() {
                return await app.config.globalProperties.$store
                    .dispatch('auth/logout')
                    .finally(() => (location.href = '/'));
            },
        };

        // Add composable for Options API
        app.mixin({
            computed: {
                $auth() {
                    return app.config.globalProperties.$auth;
                },
            },
        });
    },
};
