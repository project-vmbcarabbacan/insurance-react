import type { SettingContract } from "../../../domain/contracts/SettingContract";
import type { SettingManageCustomerResponse } from "../../../infrastructure/dtos/SettingResponse";

export class ManageCustomerUseCase {
    constructor(private setting: SettingContract) { }

    async execute(): Promise<SettingManageCustomerResponse> {
        return await this.setting.manageCustomers();
    }
}