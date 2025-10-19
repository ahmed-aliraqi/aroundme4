<script setup>
    import { trans as $t } from 'laravel-vue-i18n';
    import { computed } from 'vue';

    defineOptions({
        name: 'BsCheckbox',
        inheritAttrs: false,
    });

    const props = defineProps({
        id: String,
        resource: { type: String, required: true },
        name: { type: String, required: true },
        label: { type: String, default: null },
        note: { type: String, default: null },
        error: { type: String, default: '' },
        modelValue: {},
        value: { default: true },
        falseValue: { default: false },
    });

    const emit = defineEmits(['update:modelValue']);

    const uniqueId = Math.random().toString(36).slice(2, 9);

    const computedId = computed(() => {
        return props.id != null ? props.id : `checkbox-${uniqueId}-${props.name}`;
    });

    const computedLabel = computed(() => {
        if (props.label !== null) return props.label;
        const key = `${props.resource}.attributes.${props.name}`;
        const translated = $t(key);
        return translated === key ? null : translated;
    });

    const computedNote = computed(() => {
        if (props.note !== null) return props.note;
        const key = `${props.resource}.notes.${props.name}`;
        const translated = $t(key);
        return translated === key ? null : translated;
    });

    const isChecked = computed(() => {
        if (Array.isArray(props.modelValue)) {
            return props.modelValue.includes(props.value);
        }
        return props.modelValue === props.value;
    });

    function toggle(event) {
        if (Array.isArray(props.modelValue)) {
            let newValue = [...props.modelValue];
            if (event.target.checked) {
                if (!newValue.includes(props.value)) {
                    newValue.push(props.value);
                }
            } else {
                newValue = newValue.filter((val) => val !== props.value);
            }
            emit('update:modelValue', newValue);
        } else {
            emit('update:modelValue', event.target.checked ? props.value : props.falseValue);
        }
    }
</script>
<template>
    <div class="mb-3">
        <div class="form-check">
            <input
                type="checkbox"
                v-bind="$attrs"
                :name="name"
                :value="value"
                :checked="isChecked"
                :id="computedId"
                @change="toggle"
                class="form-check-input"
                :class="{ 'is-invalid': !!error }"
            />
            <slot name="label" :label="computedLabel">
                <label v-if="computedLabel" :for="computedId" class="form-check-label">
                    {{ computedLabel }}
                </label>
            </slot>
        </div>
        <slot name="note" :note="computedNote">
            <small v-if="computedNote" class="text-muted ps-4">{{ computedNote }}</small>
        </slot>
        <slot name="error" :error="error">
            <div v-if="error" class="text-danger ps-4">{{ error }}</div>
        </slot>
    </div>
</template>
