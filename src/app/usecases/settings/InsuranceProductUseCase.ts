import type { SettingContract } from "../../../domain/contracts/SettingContract";
import type { SettingInsuranceProductResponse } from "../../../infrastructure/dtos/SettingResponse";

export class InsuranceProductUseCase {
    constructor(private setting: SettingContract) { }

    async execute(): Promise<SettingInsuranceProductResponse> {
        return await this.setting.insuranceProduct();
    }
}