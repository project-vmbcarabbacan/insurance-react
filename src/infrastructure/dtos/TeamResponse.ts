import type { Team } from "../../core/interfaces/Team";

interface LinksResponse {
    active: boolean
    label: string
    page?: number
    url?: string
}

interface PaginatorResponse {
    current_page: number
    data: Team[]
    first_page_url: string
    last_page_url: string
    from: number
    last_page: number
    per_page: number
    path: string
    to: number
    total: number
    next_page_url?: string
    prev_page_url?: string
    links: LinksResponse[]
}

export interface TeamResponse {
    data: PaginatorResponse,
    message: string
}

export interface TeamMessageResponse {
    message: string
}