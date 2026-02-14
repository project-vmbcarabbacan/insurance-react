import type { LabelValue } from "../../core/interfaces/LabelValue"
import type { SlugName } from "../../core/interfaces/SlugName"
import type { keyBoolean } from "./TeamResponse"

interface manageTeamResponse {
    roles: SlugName[]
    statuses: LabelValue[]
}

interface manageCustomerResponse {
    statuses: LabelValue[]
    types: LabelValue[]
    products: LabelValue[]
}

interface managePlanResponse {
    statuses: LabelValue[]
    products: LabelValue[]
    policy_providers: LabelValue[]
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
    accessed: keyBoolean
}

interface detailsCustomerResponse {
    country_codes: LabelValue[]
    products: LabelValue[]
    communication_preferences: LabelValue[]
}

interface leadDetailResponse {
    activity_responses: LabelValue[]
    communication_preferences: LabelValue[]
}

export type leadVehicleResponse = {
    claim_histories: LabelValue[]
    policy_types: LabelValue[]
    specification_types: LabelValue[]
    yes_no: LabelValue[]
    emirates: LabelValue[]
    countries: LabelValue[]
    years: LabelValue[]
}

export type leadHealthResponse = {
    insurance_fors: LabelValue[]
    insure_tos: LabelValue[]
    existing_insurances: LabelValue[]
    salaries: LabelValue[]
    genders: LabelValue[]
    yes_no: LabelValue[]
    emirates: LabelValue[]
    relationships: LabelValue[]
    medical_conditions: LabelValue[]
    marital_statuses: LabelValue[]
    countries: LabelValue[]
}

export type SettingManageTeamResponse = {
    data: manageTeamResponse
    message: string
}

export type SettingManageCustomerResponse = {
    data: manageCustomerResponse
    message: string
}

export type SettingManagePlansResponse = {
    data: managePlanResponse
    message: string
}

export type SettingInsuranceProductResponse = {
    data: productResponse
    message: string
}

export type SettingUpsertCustomerResponse = {
    data: upsertCustomerResponse
    message: string
}

export type SettingDetailCustomerResponse = {
    data: detailsCustomerResponse
    message: string
}

export type SettingVehiclePrerequisitesResponse = {
    data: LabelValue[]
    message: string
}

export type SettingLeadVehiclePrerequisitesResponse = {
    data: leadVehicleResponse
    message: string
}

export type SettingLeadHealthPrerequisitesResponse = {
    data: leadHealthResponse
    message: string
}

export type SettingLeadActivityPrerequisiteResponse = {
    data: leadDetailResponse
    message: string
}