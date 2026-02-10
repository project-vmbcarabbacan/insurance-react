import type { LeadActivity } from "../../core/interfaces/Lead"
import type { LeadMessageResponse, LeadsMessageResponse } from "../../infrastructure/dtos/LeadResponse"

export type LeadContract = {
    addLeadActivity(data: LeadActivity): Promise<LeadMessageResponse>
    getAllLeads(customer_id: string): Promise<LeadsMessageResponse>
}