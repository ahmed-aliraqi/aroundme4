import { computed } from 'vue'
import { usePage } from '@inertiajs/vue3'
import type { User } from '@/types/User'

interface AuthProps {
    check: boolean
    user: User | null
}

export function useAuth() {
    const page = usePage<{ auth: AuthProps }>()

    const auth = computed(() => page.props.auth)
    const user = computed(() => page.props.auth?.user ?? null)

    return {
        auth,
        user,
    }
}
