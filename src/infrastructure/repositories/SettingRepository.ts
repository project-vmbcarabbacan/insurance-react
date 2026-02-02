import type { ApiService } from "../api/ApiService";
import { API_URL } from "../api/Urls";
import type { SettingContract } from "../../domain/contracts/SettingContract";
import type { SettingInsuranceProductResponse, SettingManageTeamResponse } from "../dtos/SettingResponse";

export class SettingRepository implements SettingContract {
    constructor(private api: ApiService) { }

    async manageTeams(): Promise<SettingManageTeamResponse> {
        return await this.api.get<SettingManageTeamResponse>(`/${API_URL.setting.manageTeams}`)
    }

    async insuranceProduct(): Promise<SettingInsuranceProductResponse> {
        return await this.api.get<SettingInsuranceProductResponse>(`/${API_URL.setting.insuranceProduct}`)
    }

}