import type { LeadHealthForm } from "../../core/interfaces/LeadHealth";
import type { HealthLeadContract } from "../../domain/contracts/HealthLeadContract";
import type { ApiService } from "../api/ApiService";
import { API_URL } from "../api/Urls";
import type { LeadMessageResponse } from "../dtos/LeadResponse";

export class HealthRepository implements HealthLeadContract {

    constructor(private api: ApiService) { }

    async storeHealthLead(data: LeadHealthForm): Promise<LeadMessageResponse> {
        return await this.api.post<LeadMessageResponse>(`/${API_URL.lead.health.store}`, data)
    }
}