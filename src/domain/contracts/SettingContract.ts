import type { SettingManageTeamResponse } from "../../infrastructure/dtos/SettingResponse";

export interface SettingContract {
    manageTeams(): Promise<SettingManageTeamResponse>
}