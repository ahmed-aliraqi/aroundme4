import { ref, inject } from 'vue';
import { router, usePage } from '@inertiajs/vue3';
import { trans, trans_choice } from 'laravel-vue-i18n';
import toast from '@/plugins/tostify.js';
import { useForm } from '@/plugins/useForm.js';

export function useCrud({ items: initialItems = [], resourceUrl, resourceName }) {
    const page = usePage();
    const items = initialItems;
    const selected = ref([]);
    const form = useForm();
    const loading = ref(false);
    const errors = ref({});

    const Swal = inject('$swal');

    // 🟡 Create item
    const createItem = (data = form, onSuccess = null) => {
        loading.value = true;
        router.post(resourceUrl, data, {
            preserveScroll: true,
            onSuccess: (page) => {
                loading.value = false;
                if (page.props.newItem) items.value.push(page.props.newItem);
                toast && toast(trans(`${resourceName}.messages.created`));
                if (onSuccess) onSuccess();
            },
            onError: (err) => {
                errors.value = err;
                loading.value = false;
            },
        });
    };

    // 🟠 Update item
    const updateItem = (id, data = form, onSuccess = null) => {
        loading.value = true;
        router.put(`${resourceUrl}/${id}`, data, {
            preserveScroll: true,
            onSuccess: (page) => {
                loading.value = false;
                if (page.props.updatedItem) {
                    const index = items.value.findIndex((i) => i.id === id);
                    if (index !== -1) items.value[index] = page.props.updatedItem;
                }
                toast && toast(trans(`${resourceName}.messages.updated`));
                if (onSuccess) onSuccess();
            },
            onError: (err) => {
                errors.value = err;
                loading.value = false;
            },
        });
    };

    // 🔴 Delete single item
    const deleteItem = (id, onSuccess = null) => {
        Swal.fire({
            title: trans(`${resourceName}.dialogs.delete.title`),
            text: trans(`${resourceName}.dialogs.delete.info`),
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: trans(`${resourceName}.dialogs.delete.confirm`),
            cancelButtonText: trans(`${resourceName}.dialogs.delete.cancel`),
        }).then((result) => {
            if (result.isConfirmed) {
                loading.value = true;
                router.delete(`${resourceUrl}/${id}`, {
                    preserveScroll: true,
                    onSuccess: () => {
                        loading.value = false;
                        if (page.props.flash?.status === 'error') {
                            toast && toast.error(page.props.flash.message);
                        } else {
                            items.value = items.value.filter((i) => i.id !== id);
                            toast && toast(trans(`${resourceName}.messages.deleted`));
                        }
                    },
                    onError: () => (loading.value = false),
                });
            }
        });
    };

    // 🗑️ Delete selected items
    const deleteSelected = (onSuccess = null) => {
        if (!selected.value.length) return;

        Swal.fire({
            title: trans(`${resourceName}.dialogs.delete_selected.title`),
            text: trans_choice(`${resourceName}.dialogs.delete_selected.info`, selected.value.length),
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: trans(`${resourceName}.dialogs.delete_selected.confirm`),
            cancelButtonText: trans(`${resourceName}.dialogs.delete_selected.cancel`),
        }).then((result) => {
            if (result.isConfirmed) {
                loading.value = true;
                router.delete(resourceUrl, {
                    data: { ids: selected.value },
                    preserveScroll: true,
                    onSuccess: () => {
                        loading.value = false;
                        items.value.data = items.value.data.filter((i) => !selected.value.includes(i.id));
                        selected.value = [];
                        toast && toast(trans(`${resourceName}.messages.deleted`));
                    },
                    onError: () => (loading.value = false),
                });
            }
        });
    };

    const selectAll = (checked) => {
        if (checked) {
            selected.value = items.value.data.map((user) => user.id);
        } else {
            selected.value = [];
        }
    };
    const clearSelected = () => (selected.value = []);

    return {
        items,
        selected,
        form,
        loading,
        errors,
        createItem,
        updateItem,
        deleteItem,
        deleteSelected,
        selectAll,
        clearSelected,
    };
}
