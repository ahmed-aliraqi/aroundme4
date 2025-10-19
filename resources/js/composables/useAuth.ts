import { computed } from 'vue'
import { usePage, router } from '@inertiajs/vue3'
import type { User } from '@/types/User'
import { route } from 'ziggy-js';

interface AuthProps {
    check: boolean
    user: User | null
}

export function useAuth() {
    const page = usePage<{ auth: AuthProps }>()

    const auth = computed(() => page.props.auth)
    const user = computed(() => page.props.auth?.user ?? null)
    const logout = () => {
        router.post(route('logout'))
    }

    return {
        auth,
        user,
        logout,
    }
}
