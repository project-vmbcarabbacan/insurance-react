import type { LeadVehicleForm } from "../../core/interfaces/LeadVehicle"
import type { LeadFindResponse, LeadMessageResponse, LeadViewResponse } from "../../infrastructure/dtos/LeadResponse"

export type VehicleLeadContract = {
    storeVehicleLead(data: LeadVehicleForm): Promise<LeadMessageResponse>
    viewVehicleLead(uui: string): Promise<LeadViewResponse>
    findVehicleLead(lead_uuid: string): Promise<LeadFindResponse>
}