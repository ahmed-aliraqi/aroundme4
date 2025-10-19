import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';
import i18n from 'laravel-vue-i18n/vite';
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/sass/sneat.scss',
                'resources/templates/sneat/assets/vendor/css/rtl/core.css',
                'resources/templates/sneat/assets/vendor/css/rtl/theme-default.css',
                'resources/templates/sneat/assets/vendor/css/rtl/core-dark.css',
                'resources/templates/sneat/assets/vendor/css/rtl/theme-default-dark.css',
                'resources/js/ui/layout-config.js',
                'resources/js/sneat.js',
                'resources/templates/sneat/assets/js/main.js',
                'resources/templates/sneat/assets/vendor/libs/jquery/jquery.js',
                'resources/templates/sneat/assets/vendor/libs/popper/popper.js',
                'resources/templates/sneat/assets/vendor/js/bootstrap.js',
                'resources/templates/sneat/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.js',
                'resources/templates/sneat/assets/vendor/libs/hammer/hammer.js',
                'resources/js/ui/menu.js',
            ],
            ssr: 'resources/js/sneat-ssr.js',
            refresh: true,
        }),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
        i18n(),
        viteStaticCopy({
            targets: [
                {
                    src: 'resources/templates/sneat/assets/img/*',
                    dest: 'images',
                },
            ]
        })
    ],
    esbuild: {
        legalComments: "none"
    },
    resolve: {
        alias: {
            '@lang': '/lang',
            '@asset': '/resources/',
            '@': '/resources/js',
        },
    },
    build: {
        chunkSizeWarningLimit: 3000,
        rollupOptions: {
            onwarn(warning, warn) {
                if (warning.message.includes('eval')) return;
                if (warning.message.includes('ssrRenderDynamicModel')) return;
                warn(warning);
            },
        },
    },
    assetsInclude: ['**/*.html'],
});
