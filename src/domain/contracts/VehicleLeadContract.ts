import type { VehicleInsuranceForm } from "../../core/interfaces/LeadVehicle"
import type { LeadMessageResponse, LeadViewResponse } from "../../infrastructure/dtos/LeadResponse"

export type VehicleLeadContract = {
    storeVehicleLead(data: VehicleInsuranceForm): Promise<LeadMessageResponse>
    viewVehicleLead(uui: string): Promise<LeadViewResponse>
}