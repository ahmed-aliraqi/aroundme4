<template>
    <div class="position-relative">
        <input
            v-bind="$attrs"
            ref="inputRef"
            :id="id"
            :name="name"
            :value="modelValue"
            :placeholder="placeholder"
            :disabled="disabled"
            :readonly="readonly"
            :class="inputClasses"
            type="text"
            autocomplete="off"
            @input="handleInput"
            @focus="handleFocus"
            @blur="handleBlur"
            @keydown="handleKeydown"
        />

        <!-- Dropdown Results -->
        <div
            v-if="showDropdown && filteredItems.length > 0"
            :class="dropdownClasses"
            ref="dropdownRef"
        >
            <div
                v-for="(item, index) in filteredItems"
                :key="getItemKey(item, index)"
                :class="getItemClasses(index)"
                @mousedown.prevent="selectItem(item)"
                @mouseenter="highlightedIndex = index"
            >
                <slot name="item" :item="item" :index="index">
                    {{ getDisplayText(item) }}
                </slot>
            </div>

            <!-- No results message -->
            <div v-if="filteredItems.length === 0 && searchQuery" class="dropdown-item text-muted">
                <slot name="no-results">
                    {{ noResultsText }}
                </slot>
            </div>
        </div>

        <!-- Loading indicator -->
        <div v-if="loading" class="position-absolute top-50 end-0 translate-middle-y me-3">
            <div class="spinner-border spinner-border-sm text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue';

    defineOptions({ name: 'BsAutocomplete' });

    const props = defineProps({
        modelValue: {
            type: [String, Number, Object],
            default: '',
        },
        icon: {
            type: [String],
            default: '',
        },
        items: {
            type: Array,
            default: () => [],
        },
        displayField: {
            type: String,
            default: 'text',
        },
        valueField: {
            type: String,
            default: 'value',
        },
        placeholder: {
            type: String,
            default: 'Type to search...',
        },
        noResultsText: {
            type: String,
            default: 'No results found',
        },
        minChars: {
            type: Number,
            default: 1,
        },
        maxResults: {
            type: Number,
            default: 10,
        },
        debounce: {
            type: Number,
            default: 300,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        readonly: {
            type: Boolean,
            default: false,
        },
        size: {
            type: String,
            default: 'md',
            validator: (value) => ['sm', 'md', 'lg'].includes(value),
        },
        variant: {
            type: String,
            default: 'outline-secondary',
        },
        id: {
            type: String,
            default: null,
        },
        name: {
            type: String,
            default: null,
        },
        loading: {
            type: Boolean,
            default: false,
        },
        caseSensitive: {
            type: Boolean,
            default: false,
        },
    });

    const emit = defineEmits(['update:modelValue', 'select', 'search', 'focus', 'blur']);

    // Refs
    const inputRef = ref(null);
    const dropdownRef = ref(null);

    // Reactive data
    const searchQuery = ref('');
    const showDropdown = ref(false);
    const highlightedIndex = ref(-1);
    const debounceTimeout = ref(null);
    const isBlurring = ref(false);

    // Computed properties
    const inputClasses = computed(() => {
        const classes = ['form-control'];

        if (props.size !== 'md') {
            classes.push(`form-control-${props.size}`);
        }

        if (props.variant && props.variant !== 'outline-secondary') {
            classes.push(`border-${props.variant.replace('outline-', '')}`);
        }

        return classes.join(' ');
    });

    const dropdownClasses = computed(() => [
        'dropdown-menu',
        'show',
        'position-absolute',
        'w-100',
        'mt-1',
        'shadow-sm',
        'border',
    ]);

    const filteredItems = computed(() => {
        if (!searchQuery.value || searchQuery.value.length < props.minChars) {
            return [];
        }

        // If we have items (likely from API), just return them limited by maxResults
        // Don't apply additional filtering since the API already filtered them
        return props.items.slice(0, props.maxResults);
    });

    // Methods
    const getDisplayText = (item) => {
        if (typeof item === 'string' || typeof item === 'number') {
            return String(item);
        }
        return item[props.displayField] || '';
    };

    const getItemValue = (item) => {
        if (typeof item === 'string' || typeof item === 'number') {
            return item;
        }
        return item[props.valueField] || item;
    };

    const getItemKey = (item, index) => {
        if (typeof item === 'object' && item.id) {
            return item.id;
        }
        return `${getItemValue(item)}-${index}`;
    };

    const getItemClasses = (index) => {
        return ['dropdown-item', 'cursor-pointer', { active: index === highlightedIndex.value }];
    };

    const handleInput = (event) => {
        const value = event.target.value;
        searchQuery.value = value;

        // Clear debounce timeout
        if (debounceTimeout.value) {
            clearTimeout(debounceTimeout.value);
        }

        // Set new debounce timeout
        debounceTimeout.value = setTimeout(() => {
            emit('search', value); // Emit the search event

            if (value.length >= props.minChars) {
                showDropdown.value = true;
                highlightedIndex.value = -1;
            } else {
                showDropdown.value = false;
            }
        }, props.debounce);

        emit('update:modelValue', value);
    };

    const handleFocus = (event) => {
        emit('focus', event);
        if (searchQuery.value.length >= props.minChars) {
            showDropdown.value = true;
        }
    };

    const handleBlur = (event) => {
        isBlurring.value = true;

        // Delay hiding dropdown to allow for item selection
        setTimeout(() => {
            if (isBlurring.value) {
                showDropdown.value = false;
                highlightedIndex.value = -1;
            }
        }, 150);

        emit('blur', event);
    };

    const handleKeydown = (event) => {
        if (!showDropdown.value || filteredItems.value.length === 0) {
            return;
        }

        switch (event.key) {
            case 'ArrowDown':
                event.preventDefault();
                highlightedIndex.value = Math.min(
                    highlightedIndex.value + 1,
                    filteredItems.value.length - 1
                );
                scrollToHighlighted();
                break;

            case 'ArrowUp':
                event.preventDefault();
                highlightedIndex.value = Math.max(highlightedIndex.value - 1, -1);
                scrollToHighlighted();
                break;

            case 'Enter':
                event.preventDefault();
                if (highlightedIndex.value >= 0) {
                    selectItem(filteredItems.value[highlightedIndex.value]);
                }
                break;

            case 'Escape':
                showDropdown.value = false;
                highlightedIndex.value = -1;
                inputRef.value.blur();
                break;
        }
    };

    const selectItem = (item) => {
        isBlurring.value = false;

        const displayText = getDisplayText(item);
        const value = getItemValue(item);

        searchQuery.value = displayText;
        showDropdown.value = false;
        highlightedIndex.value = -1;

        emit('update:modelValue', value);
        emit('select', item);

        nextTick(() => {
            inputRef.value.focus();
        });
    };

    const scrollToHighlighted = () => {
        nextTick(() => {
            if (dropdownRef.value && highlightedIndex.value >= 0) {
                const highlightedEl = dropdownRef.value.children[highlightedIndex.value];
                if (highlightedEl) {
                    highlightedEl.scrollIntoView({
                        block: 'nearest',
                    });
                }
            }
        });
    };

    const focus = () => {
        inputRef.value?.focus();
    };

    const blur = () => {
        inputRef.value?.blur();
    };

    const clear = () => {
        searchQuery.value = '';
        showDropdown.value = false;
        highlightedIndex.value = -1;
        emit('update:modelValue', '');
    };

    // Watch for external value changes
    watch(
        () => props.modelValue,
        (newValue) => {
            if (typeof newValue === 'string' || typeof newValue === 'number') {
                searchQuery.value = String(newValue);
            } else if (typeof newValue === 'object' && newValue) {
                searchQuery.value = getDisplayText(newValue);
            } else {
                searchQuery.value = '';
            }
        }
    );

    // Handle clicks outside component
    const handleClickOutside = (event) => {
        if (
            inputRef.value &&
            dropdownRef.value &&
            !inputRef.value.contains(event.target) &&
            !dropdownRef.value.contains(event.target)
        ) {
            showDropdown.value = false;
            highlightedIndex.value = -1;
        }
    };

    // Lifecycle hooks
    onMounted(() => {
        document.addEventListener('click', handleClickOutside);

        // Initialize search query from model value
        if (props.modelValue) {
            if (typeof props.modelValue === 'string' || typeof props.modelValue === 'number') {
                searchQuery.value = String(props.modelValue);
            } else if (typeof props.modelValue === 'object') {
                searchQuery.value = getDisplayText(props.modelValue);
            }
        }
    });

    onUnmounted(() => {
        document.removeEventListener('click', handleClickOutside);
        if (debounceTimeout.value) {
            clearTimeout(debounceTimeout.value);
        }
    });

    // Expose public methods
    defineExpose({
        focus,
        blur,
        clear,
    });
</script>

<style scoped>
    .cursor-pointer {
        cursor: pointer;
    }

    .dropdown-item:hover,
    .dropdown-item.active {
        background-color: var(--bs-primary);
        color: white !important;
    }

    .dropdown-menu {
        max-height: 300px;
        overflow-y: auto;
        z-index: 1050;
        font-size: 0.875rem; /* Decrease font size for dropdown */
    }

    .dropdown-item {
        font-size: 0.775rem; /* Decrease font size for dropdown items */
        padding: 0.375rem 1rem; /* Adjust padding for smaller text */
    }

    .position-relative {
        position: relative;
    }

    input:focus {
        border-right: 0;
    }
</style>
