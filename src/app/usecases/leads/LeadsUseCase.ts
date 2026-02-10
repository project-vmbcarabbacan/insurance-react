import type { LeadContract } from "../../../domain/contracts/LeadContract";
import type { LeadsMessageResponse } from "../../../infrastructure/dtos/LeadResponse";

export class LeadsUseCase {
    constructor(private lead: LeadContract) { }

    async execute(customer_uuid: string): Promise<LeadsMessageResponse> {
        return await this.lead.getAllLeads(customer_uuid)
    }
}