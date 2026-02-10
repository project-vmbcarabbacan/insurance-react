import type { LeadActivity } from "../../core/interfaces/Lead";
import type { LeadContract } from "../../domain/contracts/LeadContract";
import type { ApiService } from "../api/ApiService";
import { API_URL } from "../api/Urls";
import type { LeadMessageResponse, LeadsMessageResponse } from "../dtos/LeadResponse";

export class LeadRepository implements LeadContract {
    constructor(private api: ApiService) { }

    async addLeadActivity(data: LeadActivity): Promise<LeadMessageResponse> {
        return await this.api.post<LeadMessageResponse>(`/${API_URL.lead.activity}`, data)
    }

    async getAllLeads(customer_uuid: string): Promise<LeadsMessageResponse> {
        return await this.api.get<LeadsMessageResponse>(`/${API_URL.lead.leads}/${customer_uuid}`)
    }
}