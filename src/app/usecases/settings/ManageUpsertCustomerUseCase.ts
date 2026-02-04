import type { SettingContract } from "../../../domain/contracts/SettingContract";
import type { SettingUpsertCustomerResponse } from "../../../infrastructure/dtos/SettingResponse";

export class ManageUpsertCustomerUseCase {
    constructor(private setting: SettingContract) { }

    async execute(): Promise<SettingUpsertCustomerResponse> {
        return await this.setting.upsertCustomer();
    }
}