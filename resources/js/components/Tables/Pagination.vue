<script setup>
    import { Link } from '@inertiajs/vue3';
    import { computed } from 'vue';
    import { trans } from 'laravel-vue-i18n';

    const props = defineProps({
        data: {
            type: Object,
            required: true
        }
    });

    // Detect if it's full pagination or simple pagination
    const isFullPagination = computed(() => props.data.links && Array.isArray(props.data.links));

    // Display info text like “Showing 1 to 10 of 50 entries”
    const infoText = computed(() => {
        if (!props.data.total) return '';
        const from = props.data.from ?? 0;
        const to = props.data.to ?? 0;
        const total = props.data.total ?? 0;
        return trans('actions.pagination_showing', {from, to, total})
    });
</script>

<template>
    <div class="row mx-3 justify-content-between">
        <!-- Info -->
        <div
            class="d-md-flex justify-content-between align-items-center dt-layout-start col-md-auto me-auto mt-0">
            <div class="dt-info" aria-live="polite" role="status">
                {{ infoText }}
            </div>
        </div>

        <!-- Pagination -->
        <div
            class="d-md-flex align-items-center dt-layout-end col-md-auto ms-auto d-flex gap-md-4 justify-content-md-between justify-content-center gap-4 flex-wrap mt-0">
            <div class="dt-paging">
                <nav aria-label="pagination">
                    <ul class="pagination mb-0">

                        <!-- Pages -->
                        <template v-if="isFullPagination">
                            <li
                                v-for="(link, i) in data.links"
                                :key="i"
                                class="dt-paging-button page-item"
                                :class="{ active: link.active, disabled: link.url === null }"
                            >
                                <Link
                                    v-if="link.url"
                                    class="page-link"
                                    :href="link.url"
                                    v-html="link.label"
                                />
                                <button
                                    v-else
                                    class="page-link"
                                    type="button"
                                    v-html="link.label"
                                    disabled
                                ></button>
                            </li>
                        </template>

                        <!-- Simple Pagination (no links array) -->
                        <template v-else>
                            <li class="dt-paging-button page-item active">
                                <button class="page-link" type="button">
                                    {{ data.current_page }}
                                </button>
                            </li>
                        </template>

                    </ul>
                </nav>
            </div>
        </div>
    </div>
</template>
