<script setup>
    import FilterIcon from '@/components/Svgs/FilterIcon.vue';

    defineProps({
        submitButton: {
            type: Boolean,
            default: false,
        }
    })

    defineOptions({ name: 'FilterDropdown' });
    const emit = defineEmits(['apply']);
    const apply = () => {
        emit('apply');
    };
</script>

<template>
    <div class="dropdown">
        <button
            class="btn btn-label-secondary dropdown-toggle"
            type="button"
            id="filterDropdown"
            data-bs-toggle="dropdown"
            data-bs-auto-close="outside"
            aria-expanded="false"
        >
            <FilterIcon width="20" height="20" class="me-2"></FilterIcon>

            {{ $t('actions.filter') }}
        </button>

        <div
            class="dropdown-menu p-0"
            style="min-width: 250px; z-index: 999999"
            aria-labelledby="filterDropdown"
        >
            <div style="max-height: 400px" class="custom-scroll overflow-auto p-3">
                <slot></slot>
            </div>

            <div class="p-3 pt-0" v-if="submitButton">
                <hr class="dropdown-divider" />

                <button class="btn btn-sm btn-secondary w-100" @click.prevent="apply">
                    {{ $t('actions.apply_filter') }}
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .dropdown-toggle::after {
        display: none;
    }

    /* For WebKit browsers (Chrome, Edge, Safari) */
    .custom-scroll::-webkit-scrollbar {
        width: 8px;
    }

    .custom-scroll::-webkit-scrollbar-track {
        background: #f8f9fa; /* light gray like Bootstrap bg-light */
        border-radius: 10px;
    }

    .custom-scroll::-webkit-scrollbar-thumb {
        background-color: #adb5bd; /* Bootstrap gray-500 */
        border-radius: 10px;
        border: 2px solid #f8f9fa;
    }

    .custom-scroll::-webkit-scrollbar-thumb:hover {
        background-color: #6c757d; /* Bootstrap gray-600 */
    }

    /* For Firefox */
    .custom-scroll {
        scrollbar-width: thin;
        scrollbar-color: #adb5bd #f8f9fa;
    }
</style>
