import type { Customer, UpsertCustomer } from "../../core/interfaces/Customer"
import type { LabelValue } from "../../core/interfaces/LabelValue"
import type { LeadDetail } from "../../core/interfaces/Lead"
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

export interface CustomerDetail {
    uuid: string
    name: string
    initials: string
    contact_person: string
    phone_country_code: string
    phone_number: string
    email: string
    status: string
    type: string
}

interface CustomReponse {
    customer: UpsertCustomer
}

interface CustomerDetails {
    customer: CustomerDetail
    leads: LeadDetail[]
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

export interface CustomerDetailsResponse {
    data: CustomerDetails
    message: string
}