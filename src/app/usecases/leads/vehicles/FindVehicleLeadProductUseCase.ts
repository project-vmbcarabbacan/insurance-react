import type { VehicleLeadContract } from "../../../../domain/contracts/VehicleLeadContract";
import type { LeadFindResponse } from "../../../../infrastructure/dtos/LeadResponse";

export class FindVehicleLeadProductUseCase {
    constructor(private lead: VehicleLeadContract) { }

    async execute(lead_uuid: string): Promise<LeadFindResponse> {
        return await this.lead.findVehicleLead(lead_uuid)
    }
}