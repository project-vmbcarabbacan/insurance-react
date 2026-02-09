import type { ApiService } from "../api/ApiService";
import { API_URL } from "../api/Urls";
import type { SettingContract } from "../../domain/contracts/SettingContract";
import type { SettingDetailCustomerResponse, SettingInsuranceProductResponse, SettingLeadHealthPrerequisitesResponse, SettingLeadVehiclePrerequisitesResponse, SettingManageCustomerResponse, SettingManageTeamResponse, SettingUpsertCustomerResponse, SettingVehiclePrerequisitesResponse } from "../dtos/SettingResponse";

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

    async detailCustomer(): Promise<SettingDetailCustomerResponse> {
        return await this.api.get<SettingDetailCustomerResponse>(`/${API_URL.setting.detailCustomer}`)
    }

    async vehiclePrerequisites(): Promise<SettingLeadVehiclePrerequisitesResponse> {
        return await this.api.get<SettingLeadVehiclePrerequisitesResponse>(`/${API_URL.setting.vehicle.prerequisites}`)
    }

    async vehicleMakes(year: number): Promise<SettingVehiclePrerequisitesResponse> {
        return await this.api.get<SettingVehiclePrerequisitesResponse>(`/${API_URL.setting.vehicle.make}/${year}`)
    }

    async vehicleModels(year: number, make_id: number): Promise<SettingVehiclePrerequisitesResponse> {
        return await this.api.get<SettingVehiclePrerequisitesResponse>(`/${API_URL.setting.vehicle.model}/${year}/${make_id}`)
    }

    async vehicleTrims(year: number, make_id: number, model_id: number): Promise<SettingVehiclePrerequisitesResponse> {
        return await this.api.get<SettingVehiclePrerequisitesResponse>(`/${API_URL.setting.vehicle.trim}/${year}/${make_id}/${model_id}`)
    }

    async healthPrerequisites(): Promise<SettingLeadHealthPrerequisitesResponse> {
        return await this.api.get<SettingLeadHealthPrerequisitesResponse>(`/${API_URL.setting.health.prerequisites}`)
    }
}