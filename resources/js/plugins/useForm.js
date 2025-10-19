import { watch } from 'vue';
import { useForm as inertiaUseForm } from '@inertiajs/vue3';
import Validator from 'validatorjs';
import ar from '@/data/validation/ar';
import en from '@/data/validation/en';
import { Locale } from '@/plugins/locales';
import toast from '@/plugins/tostify.js';

Validator.setMessages('ar', ar);
Validator.setMessages('en', en);
Validator.useLang(Locale.getCode());

export function useForm(initialData) {
    const form = inertiaUseForm({
        ...initialData,
        errors: {},
        touched: {},
    });

    // ✅ Keep correct `this` binding
    const originalPost = form.post.bind(form);
    const originalPut = form.put.bind(form);
    const originalPatch = form.patch.bind(form);
    const originalDelete = form.delete.bind(form);

    // ✅ Global error handler
    function handleErrors(errors) {
        console.error('[Global Inertia Error]', errors);

        if (Object.keys(errors).length) {
            const errorList = Object.values(errors).join("\n");

            toast.error(errorList);
        }
    }

    // ✅ Override methods to add global error handling
    form.post = (url, options = {}) =>
        originalPost(url, {
            ...options,
            onError: (errors) => {
                if (options.showErrorsToast) {
                    handleErrors(errors);
                }
                options.onError?.(errors);
            },
        });

    form.put = (url, options = {}) =>
        originalPut(url, {
            ...options,
            onError: (errors) => {
                if (options.showErrorsToast) {
                    handleErrors(errors);
                }
                options.onError?.(errors);
            },
        });

    form.patch = (url, options = {}) =>
        originalPatch(url, {
            ...options,
            onError: (errors) => {
                if (options.showErrorsToast) {
                    handleErrors(errors);
                }
                options.onError?.(errors);
            },
        });

    form.delete = (url, options = {}) =>
        originalDelete(url, {
            ...options,
            onError: (errors) => {
                if (options.showErrorsToast) {
                    handleErrors(errors);
                }
                options.onError?.(errors);
            },
        });

    // ✅ Client-side validator
    form.validate = (rules, messages = {}) => {
        const validator = new Validator(form.data(), rules, messages);

        if (validator.fails()) {
            form.errors = {};
            for (const field in validator.errors.all()) {
                form.errors[field] = validator.errors.first(field);
            }
        } else {
            form.errors = {};
        }

        // Watch each field for re-validation on change
        Object.keys(rules).forEach((field) => {
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
                }
            );
        });

        return validator;
    };

    return form;
}
