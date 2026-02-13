import type { LinksResponse } from "../../infrastructure/dtos/TeamResponse"
import type { LabelValue } from "./LabelValue"

/* payload */
export interface PolicyPagination {
    keyword: string
    status: "active" | "inactive" | ""
    per_page: number
    page: number
}

export interface PolicyForm {
    uuid?: string
    code: string
    name: string
    email: string
    phone: string
}

export interface PolicyStatus {
    uuid: string
    status: "active" | "inactive"
}

/* response */
export interface PolicyResponse {
    uuid: string
    code: string
    name: string
    email: string
    phone: string
    status: string
}

interface dataResponse {
    current_page: number
    data: PolicyResponse[]
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

interface PaginatorResponse {
    policy_providers: dataResponse
    statuses: LabelValue[]
}

interface PolicyProviderSearchResponse {
    policy_provider: PolicyResponse
}

interface PolicyProviderActiveResponse {
    policy_providers: LabelValue[]
}

export interface PolictMessageResponse {
    message: string
}

export interface PolicyPaginationResponse {
    message: string
    data: PaginatorResponse
}

export interface PolicySearchResponse {
    message: string
    data: PolicyProviderSearchResponse
}

export interface PolicyActiveResponse {
    message: string
    data: PolicyProviderActiveResponse
}