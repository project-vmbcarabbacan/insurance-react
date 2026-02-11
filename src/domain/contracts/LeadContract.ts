import type { LeadActivity, LeadFilter } from "../../core/interfaces/Lead"
import type { LeadMessageResponse, LeadsMessageResponse, ViewLeadActivityResponse } from "../../infrastructure/dtos/LeadResponse"

export type LeadContract = {
    addLeadActivity(data: LeadActivity): Promise<LeadMessageResponse>
    getAllLeads(data: LeadFilter): Promise<LeadsMessageResponse>
    getLeadActivity(lead_uuid: string): Promise<ViewLeadActivityResponse>
}