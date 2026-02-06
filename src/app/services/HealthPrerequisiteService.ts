import type { SettingContract } from "../../domain/contracts/SettingContract";
import type { SettingLeadHealthPrerequisitesResponse } from "../../infrastructure/dtos/SettingResponse";

export class HealthPrerequisiteService {

    constructor(private setting: SettingContract) { }

    async getHealthPrerequisites(): Promise<SettingLeadHealthPrerequisitesResponse> {
        return this.setting.healthPrerequisites()
    }

}