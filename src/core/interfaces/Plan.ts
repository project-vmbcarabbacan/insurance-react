import type { LinksResponse } from "../../infrastructure/dtos/TeamResponse"
import type { LabelValue } from "./LabelValue"

export interface PlanPagination {
    keyword: string
    status: "active" | "inactive" | ""
    per_page: number
    page: number
    provider: string
    code: string
}

export interface PlanForm {
    uuid?: string
    provider_id: string
    insurance_product_code: string
    code: string
    name: string
    description: string
    base_premium: string
    currency: string
}

export interface PlanResponse {
    uuid: string
    provider: string
    code: string
    name: string
    description: string
    base_premium: string
    currency: string
    status: string
}

interface dataResponse {
    current_page: number
    data: PlanResponse[]
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
    plans: dataResponse
}


interface PlanSearch {
    plan: PlanForm,
    providers: LabelValue[],
    currencies: LabelValue[]
}

interface PlaActiveResponse {
    plans: LabelValue[]
}

export interface PlanPaginationResponse {
    message: string
    data: PaginatorResponse
}

export interface PlanMessageResponse {
    message: string
}

export interface PlanSearchResponse {
    message: string
    data: PlanSearch
}

export interface PlanStatus {
    uuid: string
    status: "active" | "inactive"
}

export interface PlanActiveResponse {
    message: string
    data: PlaActiveResponse
}