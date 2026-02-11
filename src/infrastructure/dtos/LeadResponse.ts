import type { LeadPaginatorResponse } from "../../core/interfaces/Lead"
import type { ViewSection } from "../../core/interfaces/LeadViewConfig"
import type { LeadLookUpResponse, LeadResponse } from "../../core/interfaces/LeadViewResponse"

interface leadView {
    lead: LeadResponse,
    view: ViewSection[]
}

export interface ActivityObject {
    type: string,
    icon: string,
    performed_by: string,
    communication_preference: string | null,
    lead_activity_response: string | null,
    notes: string | null
    created_at: string
}

export interface ActivityData {
    activities: ActivityObject[]
}

interface LeadsReponse {
    leads: LeadPaginatorResponse
}

export interface LeadMessageResponse {
    message: string
}

export interface LeadViewResponse {
    message: string
    data: leadView
}

export interface LeadFindResponse {
    message: string
    data: LeadLookUpResponse
}

export interface LeadsMessageResponse {
    message: string
    data: LeadsReponse
}

export interface ViewLeadActivityResponse {
    message: string
    data: ActivityData
}