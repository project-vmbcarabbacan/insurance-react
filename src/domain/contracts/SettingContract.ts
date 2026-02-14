import type { SettingDetailCustomerResponse, SettingInsuranceProductResponse, SettingLeadActivityPrerequisiteResponse, SettingLeadHealthPrerequisitesResponse, SettingLeadVehiclePrerequisitesResponse, SettingManageCustomerResponse, SettingManagePlansResponse, SettingManageTeamResponse, SettingUpsertCustomerResponse, SettingVehiclePrerequisitesResponse } from "../../infrastructure/dtos/SettingResponse";

export interface SettingContract {
    manageTeams(): Promise<SettingManageTeamResponse>
    manageCustomers(): Promise<SettingManageCustomerResponse>
    managePlans(): Promise<SettingManagePlansResponse>
    insuranceProduct(): Promise<SettingInsuranceProductResponse>
    upsertCustomer(): Promise<SettingUpsertCustomerResponse>
    detailCustomer(): Promise<SettingDetailCustomerResponse>
    leadActivity(uuid: string): Promise<SettingLeadActivityPrerequisiteResponse>
    vehiclePrerequisites(): Promise<SettingLeadVehiclePrerequisitesResponse>
    vehicleMakes(year: number): Promise<SettingVehiclePrerequisitesResponse>
    vehicleModels(year: number, make_id: number): Promise<SettingVehiclePrerequisitesResponse>
    vehicleTrims(year: number, make_id: number, model_id: number): Promise<SettingVehiclePrerequisitesResponse>
    healthPrerequisites(): Promise<SettingLeadHealthPrerequisitesResponse>
}