import type { SettingDetailCustomerResponse, SettingInsuranceProductResponse, SettingLeadHealthPrerequisitesResponse, SettingLeadVehiclePrerequisitesResponse, SettingManageCustomerResponse, SettingManageTeamResponse, SettingUpsertCustomerResponse, SettingVehiclePrerequisitesResponse } from "../../infrastructure/dtos/SettingResponse";

export interface SettingContract {
    manageTeams(): Promise<SettingManageTeamResponse>
    manageCustomers(): Promise<SettingManageCustomerResponse>
    insuranceProduct(): Promise<SettingInsuranceProductResponse>
    upsertCustomer(): Promise<SettingUpsertCustomerResponse>
    detailCustomer(): Promise<SettingDetailCustomerResponse>
    vehiclePrerequisites(): Promise<SettingLeadVehiclePrerequisitesResponse>
    vehicleMakes(year: number): Promise<SettingVehiclePrerequisitesResponse>
    vehicleModels(year: number, make_id: number): Promise<SettingVehiclePrerequisitesResponse>
    vehicleTrims(year: number, make_id: number, model_id: number): Promise<SettingVehiclePrerequisitesResponse>
    healthPrerequisites(): Promise<SettingLeadHealthPrerequisitesResponse>
}