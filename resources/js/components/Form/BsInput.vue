<script setup>
    import { computed, ref, watch } from 'vue';
    import { trans as $t } from 'laravel-vue-i18n';
    import { useAttrs } from 'vue';

    defineOptions({
        name: 'BsInput',
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
        type: {
            type: String,
            required: true,
            default: 'text'
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

    watch(model, (val) => {
        emit('update:modelValue', val);
    });

    watch(() => props.modelValue, (val) => {
        model.value = val;
    });
</script>

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
            <input
                :type="type"
                v-bind="attrs"
                :name="name"
                v-model="model"
                :id="computedId"
                :placeholder="computedPlaceholder"
                class="form-control"
                :class="{'is-invalid': !! error}"
            />

            <small v-if="computedNote" class="text-muted">{{ computedNote }}</small>

            <div v-if="error" class="text-danger">{{ error }}</div>
        </div>
    </div>
</template>
