import type { SlugName } from "../../core/interfaces/SlugName"

export interface UserResponse {
    user: {
        uuid: string
        name: string
        initials: string
        email: string
        status: string
        role_slug: string
        role_name: string
        permissions: SlugName[]
    },
    message: string
}