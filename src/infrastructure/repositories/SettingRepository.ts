import type { ApiService } from "../api/ApiService";
import { API_URL } from "../api/Urls";
import type { SettingContract } from "../../domain/contracts/SettingContract";
import type { SettingManageTeamResponse } from "../dtos/SettingResponse";

export class SettingRepository implements SettingContract {
    constructor(private api: ApiService) { }

    async manageTeams(): Promise<SettingManageTeamResponse> {
        const response = await this.api.get<SettingManageTeamResponse>(`/${API_URL.setting.manageTeams}`)
        return response
    }

}