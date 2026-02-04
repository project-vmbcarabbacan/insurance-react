import type { Customer, UpsertCustomer } from "../../core/interfaces/Customer"
import type { LinksResponse } from "../../infrastructure/dtos/TeamResponse"

interface PaginatorResponse {
    current_page: number
    data: Customer[]
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

interface CustomReponse {
    customer: UpsertCustomer
}

export interface CustomerResponse {
    data: PaginatorResponse,
    message: string
}

export interface CustomerMessageResponse {
    message: string
}

export interface SingleCustomerResponse {
    data: CustomReponse,
    message: string
}