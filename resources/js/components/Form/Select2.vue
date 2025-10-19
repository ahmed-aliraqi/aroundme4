<template>
    <select ref="selectElement" style="width: 100%;" :class="{ 'rtl': dir === 'rtl', 'has-invalid': error }" :id="id" :name="name" :disabled="disabled" :required="required"></select>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch, nextTick, computed } from 'vue';
// Define props
const props = defineProps({
    id: {
        type: String,
        default: ''
    },
    name: {
        type: String,
        default: ''
    },
    placeholder: {
        type: String,
        default: ''
    },
    options: {
        type: Array,
        default: () => []
    },
    disabled: {
        type: Boolean,
        default: false
    },
    required: {
        type: Boolean,
        default: false
    },
    settings: {
        type: Object,
        default: () => {}
    },
    dir: {
        type: String,
        default: 'rtl'
    },
    error: {
        type: String,
        default: ''
    },
    modelValue: null
});

// Define emits
const emit = defineEmits([
    'update:modelValue',
    'select',
    'closing',
    'close',
    'opening',
    'open',
    'clearing',
    'clear'
]);

// Reactive data
const selectElement = ref(null);
const select2 = ref(null);

// Computed properties for RTL support
const isRtl = computed(() => {
    return props.dir === 'rtl'
});

// Methods
const setOption = (val = []) => {
    if (select2.value) {
        select2.value.empty();
        select2.value.select2({
            placeholder: props.placeholder,
            theme: 'bootstrap-5',
            dir: isRtl.value ? 'rtl' : 'ltr',
            ...props.settings,
            data: val
        });
        setValue(props.modelValue);
    }
};

const setValue = (val) => {
    if (select2.value) {
        if (val instanceof Array) {
            select2.value.val([...val]);
        } else {
            select2.value.val([val]);
        }
        select2.value.trigger('change');
    }
};

// Watchers
watch(() => props.options, (val) => {
    setOption(val);
});

watch(() => props.error, (val) => {
    destroySelect2()
    setTimeout(() => {
        initSelect2()
        setValue(props.modelValue);
    }, 500)
});

watch(() => props.modelValue, (val) => {
    setValue(val);
});

const initSelect2 = () => {
    select2.value = $(selectElement.value)
        .select2({
            placeholder: props.placeholder,
            theme: 'bootstrap-5',
            dir: isRtl.value ? 'rtl' : 'ltr',
            ...props.settings,
            data: props.options,
            width: 'resolve'
        })
        .on('select2:select select2:unselect', ev => {
            emit('update:modelValue', select2.value.val());
            emit('select', ev['params']['data']);
        })
        .on('select2:closing', ev => {
            emit('closing', ev);
        })
        .on('select2:close', ev => {
            emit('close', ev);
        })
        .on('select2:opening', ev => {
            emit('opening', ev);
        })
        .on('select2:open', ev => {
            emit('open', ev);
        })
        .on('select2:clearing', ev => {
            emit('clearing', ev);
        })
        .on('select2:clear', ev => {
            emit('clear', ev);
        });
}
const destroySelect2 = () => {
    if (select2.value && typeof select2.value.select2 === 'function') {
        select2.value.select2('destroy');
    }
}

// Lifecycle hooks
onMounted(async () => {
    await nextTick();

    // Add a small delay to ensure Select2 has been loaded globally
    await new Promise(resolve => setTimeout(resolve, 150));

    // Use the globally available jQuery with Select2
    const $ = window.$;

    if (typeof $.fn.select2 === 'undefined') {
        console.error('Select2 is not loaded. Make sure it is imported globally.');

        // Try to load Select2 dynamically as a fallback
        try {
            await import('select2/dist/js/select2.full');

            // Check again after dynamic import
            if (typeof $.fn.select2 === 'undefined') {
                console.error('Select2 still not available after dynamic import');
                return;
            }
        } catch (error) {
            console.error('Failed to load Select2 dynamically:', error);
            return;
        }
    }

    initSelect2()

    setValue(props.modelValue);
});

onBeforeUnmount(() => {
    destroySelect2()
});
</script>
