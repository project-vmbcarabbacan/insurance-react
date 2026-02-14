import type { SettingContract } from "../../../domain/contracts/SettingContract";
import type { SettingManagePlansResponse } from "../../../infrastructure/dtos/SettingResponse";

export class ManagePlanUseCase {
    constructor(private setting: SettingContract) { }

    async execute(): Promise<SettingManagePlansResponse> {
        return await this.setting.managePlans()
    }
}