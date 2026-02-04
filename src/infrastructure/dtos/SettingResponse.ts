import type { LabelValue } from "../../core/interfaces/LabelValue"
import type { SlugName } from "../../core/interfaces/SlugName"

interface manageTeamResponse {
    roles: SlugName[]
    statuses: LabelValue[]
}

interface manageCustomerResponse {
    statuses: LabelValue[]
    types: LabelValue[]
    products: LabelValue[]
}

interface productResponse {
    products: LabelValue[]
}

interface upsertCustomerResponse {
    statuses: LabelValue[]
    types: LabelValue[]
    country_codes: LabelValue[]
    customer_sources: LabelValue[]
    genders: LabelValue[]
}

export interface SettingManageTeamResponse {
    data: manageTeamResponse
    message: string
}

export interface SettingManageCustomerResponse {
    data: manageCustomerResponse
    message: string
}

export interface SettingInsuranceProductResponse {
    data: productResponse
    message: string
}

export interface SettingUpsertCustomerResponse {
    data: upsertCustomerResponse
    message: string
}