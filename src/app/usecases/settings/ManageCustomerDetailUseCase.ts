import type { SettingContract } from "../../../domain/contracts/SettingContract";
import type { SettingDetailCustomerResponse } from "../../../infrastructure/dtos/SettingResponse";

export class ManageCustomerDetailUseCase {
    constructor(private setting: SettingContract) { }

    async execute(): Promise<SettingDetailCustomerResponse> {
        return await this.setting.detailCustomer();
    }
}