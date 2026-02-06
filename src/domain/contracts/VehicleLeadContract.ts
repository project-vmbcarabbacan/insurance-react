import type { VehicleInsuranceForm } from "../../core/interfaces/LeadVehicle"
import type { LeadMessageResponse } from "../../infrastructure/dtos/LeadResponse"

export type VehicleLeadContract = {
    storeVehicleLead(data: VehicleInsuranceForm): Promise<LeadMessageResponse>
}