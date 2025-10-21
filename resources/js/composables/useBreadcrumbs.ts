import { ref } from 'vue'

export interface BreadcrumbItem {
    label: string
    href?: string
}

const breadcrumbs = ref<BreadcrumbItem[]>([])

export function useBreadcrumbs() {
    function setBreadcrumbs(items: BreadcrumbItem[]) {
        breadcrumbs.value = items
    }

    return { breadcrumbs, setBreadcrumbs }
}
