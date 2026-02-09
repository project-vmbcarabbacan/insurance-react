import type { HealthLeadContract } from "../../../../domain/contracts/HealthLeadContract";
import type { LeadFindResponse } from "../../../../infrastructure/dtos/LeadResponse";

export class FindHealthLeadProductUseCase {
    constructor(private lead: HealthLeadContract) { }

    async execute(lead_uuid: string): Promise<LeadFindResponse> {
        return await this.lead.findHealthLead(lead_uuid)
    }
}