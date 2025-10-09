export interface User {
    id: number
    name: string
    phone: string
    email: string
    avatar: string
    created_at: {
        date: string
        for_humans: string
        formatted: string
    }
}
