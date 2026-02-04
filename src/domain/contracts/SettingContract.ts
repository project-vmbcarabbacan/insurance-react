import type { SettingInsuranceProductResponse, SettingManageCustomerResponse, SettingManageTeamResponse, SettingUpsertCustomerResponse } from "../../infrastructure/dtos/SettingResponse";

export interface SettingContract {
    manageTeams(): Promise<SettingManageTeamResponse>
    manageCustomers(): Promise<SettingManageCustomerResponse>
    insuranceProduct(): Promise<SettingInsuranceProductResponse>
    upsertCustomer(): Promise<SettingUpsertCustomerResponse>
}