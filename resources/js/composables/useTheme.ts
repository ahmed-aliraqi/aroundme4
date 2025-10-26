import { ref, onBeforeMount, onMounted } from 'vue';

export type ThemeMode = 'light' | 'dark' | 'system';

const theme = ref<ThemeMode>('light');

const pageLoaded = ref<boolean>(false);
const resolvedMode = ref<string>('');

export function useTheme() {
    function resolveMode(mode: ThemeMode): Exclude<ThemeMode, 'system'> {
        if (mode === 'system') {
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        return mode;
    }

    function applyTheme(mode: ThemeMode): void {
        pageLoaded.value = false;
        const resolved = resolveMode(mode);
        const html = document.documentElement;

        html.setAttribute('data-mode', resolved);
        localStorage.setItem('theme', mode);

        theme.value = mode;


        document.querySelectorAll<HTMLLinkElement>('link[data-theme-style]').forEach(link => link.remove())

        const themeStyles: Record<string, string> = import.meta.glob('/resources/templates/sneat/assets/vendor/css/rtl/*.css', {
            eager: true,
            query: '?url',
            import: 'default',
        });

        const styles =
            resolved === 'dark'
                ? [themeStyles['/resources/templates/sneat/assets/vendor/css/rtl/core-dark.css'], themeStyles['/resources/templates/sneat/assets/vendor/css/rtl/theme-default-dark.css']]
                : []

        for (const href of styles) {
            const link = document.createElement('link')
            link.rel = 'stylesheet'
            link.href = href
            link.dataset.themeStyle = resolved
            document.head.appendChild(link)
        }

        html.classList.remove('light-style');
        html.classList.remove('dark-style');
        html.classList.add(resolved + '-style');

        pageLoaded.value = true;

        resolvedMode.value = resolved;
    }

    onMounted(() => {
        const saved = (localStorage.getItem('theme') as ThemeMode | null) || 'system';
        theme.value = saved;
        applyTheme(saved);
    });

    return { theme, applyTheme, resolvedMode, resolveMode, pageLoaded};
}
