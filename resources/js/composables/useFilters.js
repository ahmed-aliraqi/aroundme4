import { ref, watch } from 'vue';
import { router } from '@inertiajs/vue3';
import debounce from 'lodash/debounce';
import { route } from 'ziggy-js';

export function useFilters(initialQuery = {}, routeName) {
    // reactive filter state
    const filter = ref({
        type: initialQuery?.type || [],
        perPage: initialQuery?.perPage || undefined,
        q: initialQuery?.q || '',
        page: initialQuery?.page || '',
        email: initialQuery?.email || '',
    });

    // Debounced router update
    const updateQuery = debounce((value) => {
        const filtered = Object.fromEntries(
            Object.entries(value).filter(([_, v]) => v !== '' && v != null)
        );
        router.get(route(routeName), filtered, {
            preserveState: true,
            replace: true,
        });
    }, 200);

    // Watch for changes
    watch(
        filter,
        (value) => updateQuery(value),
        { deep: true }
    );

    // Optional: method to apply additional custom filters
    const applyFilters = () => {
        updateQuery(filter.value);
    };

    return {
        filter,
        applyFilters,
    };
}
