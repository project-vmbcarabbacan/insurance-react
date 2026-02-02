import type { SettingContract } from "../../../domain/contracts/SettingContract";
import type { SettingManageTeamResponse } from "../../../infrastructure/dtos/SettingResponse";

export class ManageTeamUseCase {
    constructor(private setting: SettingContract) { }

    async execute(): Promise<SettingManageTeamResponse> {
        return await this.setting.manageTeams();
    }
}