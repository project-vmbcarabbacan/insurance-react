import type { SettingInsuranceProductResponse, SettingManageTeamResponse } from "../../infrastructure/dtos/SettingResponse";

export interface SettingContract {
    manageTeams(): Promise<SettingManageTeamResponse>
    insuranceProduct(): Promise<SettingInsuranceProductResponse>
}