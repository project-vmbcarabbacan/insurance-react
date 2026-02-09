import type { LeadVehicleForm } from "../../core/interfaces/LeadVehicle";
import type { VehicleLeadContract } from "../../domain/contracts/VehicleLeadContract";
import type { ApiService } from "../api/ApiService";
import { API_URL } from "../api/Urls";
import type { LeadFindResponse, LeadMessageResponse, LeadViewResponse } from "../dtos/LeadResponse";

export class VehicleRepository implements VehicleLeadContract {

    constructor(private api: ApiService) { }

    async storeVehicleLead(data: LeadVehicleForm): Promise<LeadMessageResponse> {
        return await this.api.post<LeadMessageResponse>(`/${API_URL.lead.vehicle.store}`, data)
    }

    async viewVehicleLead(uuid: string): Promise<LeadViewResponse> {
        return await this.api.get<LeadViewResponse>(`/${API_URL.lead.vehicle.view}/${uuid}`);
    }

    async findVehicleLead(lead_uuid: string): Promise<LeadFindResponse> {
        return await this.api.get<LeadFindResponse>(`/${API_URL.lead.vehicle.find}/${lead_uuid}`);
    }
}