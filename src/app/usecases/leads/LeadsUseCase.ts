import type { LeadFilter } from "../../../core/interfaces/Lead";
import type { LeadContract } from "../../../domain/contracts/LeadContract";
import type { LeadsMessageResponse } from "../../../infrastructure/dtos/LeadResponse";

export class LeadsUseCase {
    constructor(private lead: LeadContract) { }

    async execute(data: LeadFilter): Promise<LeadsMessageResponse> {
        return await this.lead.getAllLeads(data)
    }
}