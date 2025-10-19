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
            <div class="input-group" :class="{ 'is-invalid': !!error || invalid }">
                <button
                    v-if="locale.getDir() === 'ltr'"
                    class="form-control dropdown-toggle"
                    :class="{ 'is-invalid': !!error || invalid }"
                    style="flex:.3"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false">
                    {{ selectedCountry?.getFlag() }} {{ selectedCountry?.getDialCode() }}
                </button>
                <ul v-if="locale.getDir() === 'ltr'" class="dropdown-menu" style="max-height: 250px; overflow-y: auto; position: relative;padding-top: 0">
                    <li style="position: sticky; top: 0; background: var(--bs-dropdown-bg); z-index: 10;">
                        <div class="p-2 border-bottom">
                            <input type="text" :placeholder="$t('actions.search')" class="form-control form-control-sm" v-model="search">
                        </div>
                    </li>

                    <li v-for="country in filteredCountries">
                        <a class="dropdown-item"
                           :class="{active: selectedCountry?.getCode() === country.getCode()}"
                           href="javascript:void(0);"
                           @click.prevent="onSelectCountry(country)">
                            {{ country.getFlag() }} {{ country.getCode() }} ({{ country.getDialCode() }})
                        </a>
                    </li>
                </ul>
                <input
                    type="tel"
                    v-bind="attrs"
                    ref="input"
                    :name="name"
                    :value="displayValue"
                    :id="computedId"
                    class="form-control"
                    :placeholder="selectedCountry?.getPhonePlaceholder()"
                    @input="onInput"
                    @blur="onBlur"
                    :class="{ 'is-invalid': !!error || invalid }"
                    inputmode="tel"
                    autocomplete="tel"
                    style="direction: ltr;text-align: left;"
                />
                <button
                    v-if="locale.getDir() === 'rtl'"
                    class="form-control dropdown-toggle"
                    :class="{ 'is-invalid': !!error || invalid }"
                    style="flex:.3"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false">
                    {{ selectedCountry?.getFlag() }} {{ selectedCountry?.getDialCode() }}
                </button>
                <ul v-if="locale.getDir() === 'rtl'" class="dropdown-menu" style="max-height: 250px; overflow-y: auto; position: relative; padding-top:0">
                    <li style="position: sticky; top: 0; background: var(--bs-dropdown-bg); z-index: 10;">
                        <div class="p-2 border-bottom">
                            <input type="text" :placeholder="$t('actions.search')" class="form-control form-control-sm" v-model="search">
                        </div>
                    </li>

                    <li v-for="country in filteredCountries">
                        <a class="dropdown-item"
                           :class="{active: selectedCountry?.getCode() === country.getCode()}"
                           href="javascript:void(0);"
                           @click.prevent="onSelectCountry(country)">
                            {{ country.getFlag() }} {{ country.getName(locale.getCode()) }} ({{ country.getDialCode() }})
                        </a>
                    </li>
                </ul>
            </div>

            <small v-if="computedNote" class="text-muted">{{ computedNote }}</small>
            <div v-if="error || invalid" class="text-danger">{{ error || validationError }}</div>
        </div>

    </div>
</template>

<script setup>
    import { computed, ref, onMounted, watch, inject } from 'vue';
import {trans as $t} from 'laravel-vue-i18n';
import {useAttrs} from 'vue';
import {parsePhoneNumberFromString, AsYouType} from 'libphonenumber-js';
import $countries from '@/plugins/countries';
import {Locales} from '@/plugins/locales.js';

    defineOptions({
    name: 'BsPhoneInput',
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
    label: String,
    note: String,
    error: {
        type: String,
        default: ''
    },
    modelValue: {
        type: String,
        default: ''
    },
    defaultCountry: {
        type: String,
        default: 'SA'
    },
    countries: {
        type: Array,
        default: () => []
    }
});

const emit = defineEmits(['update:modelValue']);
const attrs = useAttrs();

const input = ref(null);
const selectedCountry = ref(null);
const invalid = ref(false);
const validationError = ref('');
const displayValue = ref('');
const phoneNumber = ref(null);
const isInternalUpdate = ref(false);

const $phoneCountries = $countries.get();
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
    if (props.note !== undefined && props.note !== null) return props.note;
    const key = `${props.resource}.notes.${props.name}`;
    const translated = $t(key);
    return translated === key ? null : translated;
});

const search = ref('')

const locale = ref(Locales.current())

const filteredCountries = computed(() => {
    let countries = $phoneCountries;
    if (props.countries.length > 0) {
        countries = countries.filter(c => props.countries.includes(c.getCode()));
    }

    const query = search.value.trim().toLowerCase()
    if (!query) return countries
    return countries.filter(country =>
        `${country.getName('en')} ${country.getName('ar')} ${country.getCode()} ${country.getDialCode()} ${country.getFlag()}`
            .toLowerCase()
            .includes(query)
    ).sort((a, b) => {
        const selectedCode = selectedCountry.value?.getCode();
        if (a.getCode() === selectedCode) return -1;
        if (b.getCode() === selectedCode) return 1;
        return 0;
    });
})

const qualifyModelValue = (value) => {
    if (!value) {
        displayValue.value = '';
        return;
    }

    try {
        phoneNumber.value = parsePhoneNumberFromString(value);
        if (phoneNumber.value) {
            selectedCountry.value = $phoneCountries.find(country => country.getCode() === phoneNumber.value.country);
            displayValue.value = phoneNumber.value.formatNational();
        }
    } catch (error) {
        console.error('Invalid phone number:', error);
    }
};

watch(() => props.modelValue, (newVal) => {
    if (isInternalUpdate.value) {
        isInternalUpdate.value = false;
        return;
    }
    qualifyModelValue(newVal);
}, {immediate: true});

const onSelectCountry = (country) => {
    selectedCountry.value = country;
    displayValue.value = '';
    input.value.value = '';
    emit('update:modelValue', '');
    input.value.focus();
    search.value = ''
};

const onInput = (event) => {
    // Clean input: allow digits and +
    let inputVal = event.target.value.replace(/[^\d+]/g, '');

    const asYouType = new AsYouType(selectedCountry.value.getCode());
    const formattedValue = asYouType.input(inputVal);

    displayValue.value = formattedValue;
    event.target.value = formattedValue;

    const phoneNumberObj = asYouType.getNumber();

    if (filteredCountries.value.filter(c => c.getCode() === asYouType.getCountry()).length) {
        selectedCountry.value = filteredCountries.value.filter(c => c.getCode() === asYouType.getCountry())[0]
    }

    isInternalUpdate.value = true;
    if (phoneNumberObj && phoneNumberObj.isValid()) {
        invalid.value = false;
        emit('update:modelValue', phoneNumberObj.format('E.164'));
    } else {
        invalid.value = true;
        emit('update:modelValue', '');
    }
};

const onBlur = (event) => {
    const inputVal = event.target.value;

    const phone = parsePhoneNumberFromString(inputVal, selectedCountry.value.getCode());
    if (phone && phone.isValid()) {
        invalid.value = false;
        displayValue.value = phone.formatNational();
        event.target.value = displayValue.value;
        isInternalUpdate.value = true;
        emit('update:modelValue', phone.format('E.164'));
    } else {
        invalid.value = true;
        emit('update:modelValue', '');
    }
};

onMounted(() => {
    selectedCountry.value = $phoneCountries.find(country => country.getCode() === props.defaultCountry);
    if (props.modelValue) {
        qualifyModelValue(props.modelValue);
    }
});
</script>
<style scoped>
    .dropdown-toggle::after {
        display: none;
    }
    .input-group.is-invalid:focus-within .form-control.is-invalid, .input-group.is-invalid:focus-within .input-group-text.is-invalid {
        border-color: var(--bs-form-invalid-color) !important;
    }
</style>
