import type { LeadHealthForm } from "../../core/interfaces/LeadHealth"
import type { LeadFindResponse, LeadMessageResponse, LeadViewResponse } from "../../infrastructure/dtos/LeadResponse"

export type HealthLeadContract = {
    storeHealthLead(data: LeadHealthForm): Promise<LeadMessageResponse>
    viewHealthLead(uui: string): Promise<LeadViewResponse>
    findHealthLead(lead_uuid: string): Promise<LeadFindResponse>
}