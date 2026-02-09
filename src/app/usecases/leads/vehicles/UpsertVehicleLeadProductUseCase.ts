import type { LeadVehicleForm } from "../../../../core/interfaces/LeadVehicle";
import type { VehicleLeadContract } from "../../../../domain/contracts/VehicleLeadContract";
import type { LeadMessageResponse } from "../../../../infrastructure/dtos/LeadResponse";
import { UpsertLeadVehicleError } from "../../../errors/UpsertLeadVehicleError";

export class UpsertVehicleLeadProductUseCase {
    constructor(private lead: VehicleLeadContract) { }

    async execute(data: LeadVehicleForm): Promise<LeadMessageResponse> {
        try {
            return await this.lead.storeVehicleLead(data)
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new UpsertLeadVehicleError(error.message)
            }

            throw new UpsertLeadVehicleError()
        }
    }
}