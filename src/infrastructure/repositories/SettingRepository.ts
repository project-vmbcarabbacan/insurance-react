import type { ApiService } from "../api/ApiService";
import { API_URL } from "../api/Urls";
import type { SettingContract } from "../../domain/contracts/SettingContract";
import type { SettingInsuranceProductResponse, SettingManageCustomerResponse, SettingManageTeamResponse, SettingUpsertCustomerResponse } from "../dtos/SettingResponse";

export class SettingRepository implements SettingContract {
    constructor(private api: ApiService) { }

    async manageTeams(): Promise<SettingManageTeamResponse> {
        return await this.api.get<SettingManageTeamResponse>(`/${API_URL.setting.manageTeams}`)
    }

    async manageCustomers(): Promise<SettingManageCustomerResponse> {
        return await this.api.get<SettingManageCustomerResponse>(`/${API_URL.setting.manageCustomers}`)
    }

    async insuranceProduct(): Promise<SettingInsuranceProductResponse> {
        return await this.api.get<SettingInsuranceProductResponse>(`/${API_URL.setting.insuranceProduct}`)
    }

    async upsertCustomer(): Promise<SettingUpsertCustomerResponse> {
        return await this.api.get<SettingUpsertCustomerResponse>(`/${API_URL.setting.upsertCustomer}`)
    }

}