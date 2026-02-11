import type { LinksResponse } from "../../infrastructure/dtos/TeamResponse"

export interface LeadFilter {
    customer_uuid?: string
    page: number
    per_page: number
    keyword?: string
}

export interface LeadDetail {
    uuid: string
    product: string
    lead_details: string
    due_date: string
    status: string
}

export interface LeadActivity {
    uuid?: string
    communication_preference: string
    activity_response: string
    notes: string
}

export interface LeadPaginatorResponse {
    current_page: number
    data: LeadDetail[]
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