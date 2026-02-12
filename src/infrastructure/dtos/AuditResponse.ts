import type { AuditData } from "../../core/interfaces/Audit"
import type { LinksResponse } from "./TeamResponse"

interface PaginatorResponse {
    current_page: number
    data: AuditData[]
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

export interface LeadActivityResponse {
    message: string
    data: PaginatorResponse
}