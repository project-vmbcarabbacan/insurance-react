import type { LeadDetail } from "../../core/interfaces/Lead"
import type { ViewSection } from "../../core/interfaces/LeadViewConfig"
import type { LeadLookUpResponse, LeadResponse } from "../../core/interfaces/LeadViewResponse"

interface leadView {
    lead: LeadResponse,
    view: ViewSection[]
}

interface LeadsReponse {
    leads: LeadDetail[]
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