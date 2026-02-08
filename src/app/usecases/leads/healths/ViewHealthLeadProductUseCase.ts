import type { HealthLeadContract } from "../../../../domain/contracts/HealthLeadContract";
import type { LeadViewResponse } from "../../../../infrastructure/dtos/LeadResponse";

export class ViewHealthLeadProductUseCase {
    constructor(private lead: HealthLeadContract) { }

    async execute(uuid: string): Promise<LeadViewResponse> {
        return await this.lead.viewHealthLead(uuid)
    }
}