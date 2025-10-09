import {watch} from "vue";
import {useForm as inertiaUseForm} from "@inertiajs/vue3";
import Validator from "validatorjs";
import ar from "@/data/validation/ar";
import en from "@/data/validation/en";
import { Locale } from '@/plugins/locales';

Validator.setMessages("ar", ar);
Validator.setMessages("en", en);

Validator.useLang(Locale.getCode());

export function useForm(initialData) {
    const form = inertiaUseForm({
        ...initialData,
        errors: {},
        touched: {},
    });

    form.validate = (rules, messages = {}) => {
        const validator = new Validator(form.data(), rules, messages);

        if (validator.fails()) {
            form.errors = {};
            Object.keys(validator.errors.all()).forEach((field) => {
                form.errors[field] = validator.errors.first(field);
            });
        } else {
            form.errors = {};
        }

        Object.keys(form).forEach((field) => {
            if (field === "errors" || field === "touched") return;

            watch(
                () => form[field],
                () => {
                    if (form.errors?.[field]) {
                        const fieldData = { [field]: form[field] };
                        const fieldRule = { [field]: rules[field] };

                        const fieldValidator = new Validator(fieldData, fieldRule, messages);
                        if (fieldValidator.fails()) {
                            form.errors[field] = fieldValidator.errors.first(field);
                        } else {
                            delete form.errors[field];
                        }
                    }
                },
                { deep: true }
            );
        });

        return validator;
    }

    return form;
}
