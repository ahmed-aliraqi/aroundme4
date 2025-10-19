<template>
    <div class="mb-3">
        <label
            v-if="computedLabel"
            :for="computedId"
            class="form-label"
        >
            {{ computedLabel }}
        </label>
        <div>
            <select
                v-bind="attrs"
                :name="name"
                v-model="model"
                :id="computedId"
                class="form-select"
                :class="{'is-invalid': !! error}"
            >
                <option v-if="computedPlaceholder" disabled value="">
                    {{ placeholder }}
                </option>

                <option
                    v-for="option in options"
                    :key="optionKey(option)"
                    :value="optionValue(option)"
                >
                    {{ optionLabel(option) }}
                </option>
            </select>

            <small v-if="computedNote" class="text-muted">{{ computedNote }}</small>

            <div v-if="error" class="text-danger">{{ error }}</div>
        </div>
    </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import { trans as $t } from 'laravel-vue-i18n';
import { useAttrs } from 'vue';

defineOptions({
    name: 'BsSelect',
    inheritAttrs: false
});

const props = defineProps({
    id: String,
    resource: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    label: {
        type: String,
        default: null
    },
    note: {
        type: String,
        default: null
    },
    placeholder: {
        type: String,
        default: null
    },
    error: {
        default: ''
    },
    modelValue: {
        default: ''
    },
    options: {
        type: Array,
        required: true,
        default: () => []
    },
    optionValue: {
        type: [String, Function],
        default: 'value'
    },
    optionLabel: {
        type: [String, Function],
        default: 'label'
    },
    optionKey: {
        type: [String, Function],
        default: null
    }
});

const emit = defineEmits(['update:modelValue']);
const attrs = useAttrs();
const model = ref(props.modelValue);

const computedId = computed(() => {
    return props.id || props.name;
});

const computedLabel = computed(() => {
    if (props.label) return props.label;
    const key = `${props.resource}.attributes.${props.name}`;
    const translated = $t(key);
    return translated === key ? null : translated;
});

const computedNote = computed(() => {
    if (props.note) return props.note;
    const key = `${props.resource}.notes.${props.name}`;
    const translated = $t(key);
    return translated === key ? null : translated;
});

const computedPlaceholder = computed(() => {
    if (props.placeholder) return props.placeholder;
    const key = `${props.resource}.placeholders.${props.name}`;
    const translated = $t(key);
    return translated === key ? null : translated;
});

const optionValue = (option) => {
    if (typeof props.optionValue === 'function') {
        return props.optionValue(option);
    }
    return option[props.optionValue];
};

const optionLabel = (option) => {
    if (typeof props.optionLabel === 'function') {
        return props.optionLabel(option);
    }
    return option[props.optionLabel];
};

const optionKey = (option) => {
    if (props.optionKey === null) {
        return optionValue(option);
    }
    if (typeof props.optionKey === 'function') {
        return props.optionKey(option);
    }
    return option[props.optionKey];
};

watch(model, (val) => {
    emit('update:modelValue', val);
});

watch(() => props.modelValue, (val) => {
    model.value = val;
});
</script>
