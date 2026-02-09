import type { ViewSection } from "../../core/interfaces/LeadViewConfig"
import type { LeadLookUpResponse, LeadResponse } from "../../core/interfaces/LeadViewResponse"

interface leadView {
    lead: LeadResponse,
    view: ViewSection[]
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