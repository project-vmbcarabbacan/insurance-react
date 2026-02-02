export interface TeamFilter {
    status: string
    page: number
    per_page: number
    keyword?: string
    role_slug?: string
}

export interface Team {
    uuid: string
    name: string
    email: string
    status: string
    role_name: string
}

export interface AddTeam {
    email: string
    name: string
    role_slug: string
    password: string
    uuid?: string
    status?: string
}

export interface TeamStatus {
    uuid?: string;
    uuids?: string[];
    status: string;
}

export type TeamPassword = Pick<AddTeam, 'uuid' | 'password'>