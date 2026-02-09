import type { LeadHealthForm } from "../../../../core/interfaces/LeadHealth";
import type { HealthLeadContract } from "../../../../domain/contracts/HealthLeadContract";
import type { LeadMessageResponse } from "../../../../infrastructure/dtos/LeadResponse";
import { UpsertLeadHealthError } from "../../../errors/UpsertLeadHealthError";

export class UpsertHealthLeadProductUseCase {
    constructor(private lead: HealthLeadContract) { }

    async execute(data: LeadHealthForm): Promise<LeadMessageResponse> {
        try {
            return await this.lead.storeHealthLead(data)
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new UpsertLeadHealthError(error.message)
            }

            throw new UpsertLeadHealthError()
        }
    }
}