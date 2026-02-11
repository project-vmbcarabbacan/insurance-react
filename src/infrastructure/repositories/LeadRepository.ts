import type { LeadActivity, LeadFilter } from "../../core/interfaces/Lead";
import type { LeadContract } from "../../domain/contracts/LeadContract";
import type { ApiService } from "../api/ApiService";
import { API_URL } from "../api/Urls";
import type { LeadMessageResponse, LeadsMessageResponse, ViewLeadActivityResponse } from "../dtos/LeadResponse";

export class LeadRepository implements LeadContract {
    constructor(private api: ApiService) { }

    async addLeadActivity(data: LeadActivity): Promise<LeadMessageResponse> {
        return await this.api.post<LeadMessageResponse>(`/${API_URL.lead.activity.add}`, data)
    }

    async getAllLeads(data: LeadFilter): Promise<LeadsMessageResponse> {
        const { customer_uuid, ...payload } = data
        return await this.api.get<LeadsMessageResponse>(`/${API_URL.lead.leads}/${customer_uuid}`, {
            params: payload
        })
    }

    async getLeadActivity(lead_uuid: string): Promise<ViewLeadActivityResponse> {
        return await this.api.get(`${API_URL.lead.activity.get}/${lead_uuid}`)
    }

}