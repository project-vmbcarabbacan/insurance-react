import type { VehicleLeadContract } from "../../../../domain/contracts/VehicleLeadContract";
import type { LeadViewResponse } from "../../../../infrastructure/dtos/LeadResponse";

export class ViewVehicleLeadProductUseCase {
    constructor(private lead: VehicleLeadContract) { }

    async execute(uuid: string): Promise<LeadViewResponse> {
        return await this.lead.viewVehicleLead(uuid)
    }
}