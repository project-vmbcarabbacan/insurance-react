import type { VehicleInsuranceForm } from "../../core/interfaces/LeadVehicle";
import type { VehicleLeadContract } from "../../domain/contracts/VehicleLeadContract";
import type { ApiService } from "../api/ApiService";
import { API_URL } from "../api/Urls";
import type { LeadMessageResponse, LeadViewResponse } from "../dtos/LeadResponse";

export class VehicleRepository implements VehicleLeadContract {

    constructor(private api: ApiService) { }

    async storeVehicleLead(data: VehicleInsuranceForm): Promise<LeadMessageResponse> {
        return await this.api.post<LeadMessageResponse>(`/${API_URL.lead.vehicle.store}`, data)
    }

    async viewVehicleLead(uuid: string): Promise<LeadViewResponse> {
        return await this.api.get<LeadViewResponse>(`/${API_URL.lead.vehicle.view}/${uuid}`);
    }
}