import type { SettingContract } from "../../../domain/contracts/SettingContract";
import type { SettingLeadActivityPrerequisiteResponse } from "../../../infrastructure/dtos/SettingResponse";

export class ManageLeadActivityUseCase {
    constructor(private setting: SettingContract) { }

    async execute(uuid: string): Promise<SettingLeadActivityPrerequisiteResponse> {
        return await this.setting.leadActivity(uuid)
    }
}