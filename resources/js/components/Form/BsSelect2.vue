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
            <Select2
                v-bind="attrs"
                :name="name"
                v-model="model"
                :id="computedId"
                :options="options"
                :settings="settings"
                :multiple="multiple"
                :placeholder="placeholder"
                class="form-select"
                :error="error"
                :class="{'is-invalid': !! error}"
            ></Select2>

            <small v-if="computedNote" class="text-muted">{{ computedNote }}</small>

            <div class="d-flex gap-3" v-if="multiple">
                <a href="" class="text-muted fs-7" @click.prevent="selectAll">{{ $t('actions.select_all') }}</a>
                <a href="" class="text-muted fs-7" @click.prevent="unselectAll">{{ $t('actions.unselect_all') }}</a>
            </div>

            <div v-if="error" class="text-danger">{{ error }}</div>
        </div>
    </div>
</template>
<style>
.select2-container--bootstrap-5 .select2-selection--multiple .select2-selection__rendered .select2-selection__choice {
    gap: 5px;
}
</style>
<script setup>
import { computed, ref, watch } from 'vue';
import { trans as $t } from 'laravel-vue-i18n';
import { useAttrs } from 'vue';
import Select2 from "@/components/Form/Select2.vue";

defineOptions({
    name: 'BsSelect',
    inheritAttrs: false
});

const props = defineProps({
    id: String,
    multiple: {},
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
    settings: {
        type: Object,
        required: false,
        default: () => {}
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

watch(model, (val) => {
    emit('update:modelValue', val);
});

const selectAll = () => {
    model.value = props.options.map(option => option.id)
}
const unselectAll = () => {
    model.value = ''
}
</script>
