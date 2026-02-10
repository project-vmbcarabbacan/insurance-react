import type { LeadActivity } from "../../../core/interfaces/Lead";
import type { LeadContract } from "../../../domain/contracts/LeadContract";
import type { LeadMessageResponse } from "../../../infrastructure/dtos/LeadResponse";

export class LeadActivityUseCase {
    constructor(private lead: LeadContract) { }

    async execute(data: LeadActivity): Promise<LeadMessageResponse> {
        return await this.lead.addLeadActivity(data)
    }
}