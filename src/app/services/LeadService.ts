import type { LeadContract } from "../../domain/contracts/LeadContract";
import type { ViewLeadActivityResponse } from "../../infrastructure/dtos/LeadResponse";

export class LeadService {
    constructor(private lead: LeadContract) { }

    async getLeadACtivity(lead_uuid: string): Promise<ViewLeadActivityResponse> {
        return this.lead.getLeadActivity(lead_uuid)
    }
}