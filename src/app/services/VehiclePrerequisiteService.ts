import type { SettingContract } from "../../domain/contracts/SettingContract";
import type { SettingLeadVehiclePrerequisitesResponse, SettingVehiclePrerequisitesResponse } from "../../infrastructure/dtos/SettingResponse";

export class VehiclePrerequisiteService {

    constructor(private setting: SettingContract) { }

    async getVehiclePrerequisites(): Promise<SettingLeadVehiclePrerequisitesResponse> {
        return this.setting.vehiclePrerequisites()
    }

    async getVehicleMakes(year: number): Promise<SettingVehiclePrerequisitesResponse> {
        return this.setting.vehicleMakes(year)
    }

    async getVehicleModels(year: number, make_id: number): Promise<SettingVehiclePrerequisitesResponse> {
        return this.setting.vehicleModels(year, make_id)
    }

    async getVehicleTrims(year: number, make_id: number, model_id: number): Promise<SettingVehiclePrerequisitesResponse> {
        return this.setting.vehicleTrims(year, make_id, model_id);
    }

}