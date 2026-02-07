import type { LeadHealthForm } from "../../core/interfaces/LeadHealth"
import type { LeadMessageResponse } from "../../infrastructure/dtos/LeadResponse"

export type HealthLeadContract = {
    storeHealthLead(data: LeadHealthForm): Promise<LeadMessageResponse>
}