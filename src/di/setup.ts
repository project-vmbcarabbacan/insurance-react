import { TOKENS } from "./tokens";
import { container } from "./container";

import { AxiosApiService } from "../infrastructure/api/AxiosApiService";

/*---------------------*repositories*---------------------*/
import { AuthRepository } from "../infrastructure/repositories/AuthRepository";
import { UserRepository } from "../infrastructure/repositories/UserRepository";
import { SettingRepository } from "../infrastructure/repositories/SettingRepository.ts";
import { TeamRepository } from "../infrastructure/repositories/TeamRepository.ts";
import { CustomerRepository } from "../infrastructure/repositories/CustomerRepository.ts";
import { VehicleRepository } from "../infrastructure/repositories/VehicleRepository.ts";
import { HealthRepository } from "../infrastructure/repositories/HealthRepository.ts";

/*---------------------*usecases*---------------------*/
/* auth */
import { LoginUseCase } from "../app/usecases/auths/LoginUseCase";
import { LogoutUseCase } from "../app/usecases/auths/LogoutUseCase";
import { CsrfUseCase } from "../app/usecases/auths/CsrfUseCase.ts";
/* users */
import { CurrentUseCase } from "../app/usecases/users/CurrentUseCase.ts";
import { TeamUseCase } from "../app/usecases/users/TeamUseCase.ts";
import { UpsertTeamUseCase } from "../app/usecases/users/UpsertTeamUseCase.ts";
import { UpdateTeamStatusUseCase } from "../app/usecases/users/UpdateTeamStatusUseCase.ts";
import { UpdateTeamPasswordUseCase } from "../app/usecases/users/UpdateTeamPasswordUseCase.ts";
import { TeamAccessedUseCase } from "../app/usecases/users/TeamAccessedUseCase.ts";
import { UpsertTeamProductAccessedUseCase } from "../app/usecases/users/UpsertTeamProductAccessedUseCase.ts";
/* customers */
import { CustomerUseCase } from "../app/usecases/customers/CustomerUseCase.ts";
import { UpsertCustomerUseCase } from "../app/usecases/customers/UpsertCustomerUseCase.ts";
import { SingleCustomerUseCase } from "../app/usecases/customers/SingleCustomerUseCase.ts";
/* settings */
import { ManageTeamUseCase } from "../app/usecases/settings/ManageTeamUseCase.ts";
import { InsuranceProductUseCase } from "../app/usecases/settings/InsuranceProductUseCase.ts";
import { ManageCustomerUseCase } from "../app/usecases/settings/ManageCustomerUseCase.ts";
import { ManageUpsertCustomerUseCase } from "../app/usecases/settings/ManageUpsertCustomerUseCase.ts";
/* leads -> vehicles */
import { UpsertVehicleLeadProductUseCase } from "../app/usecases/leads/vehicles/UpsertVehicleLeadProductUseCase.ts";
/* leads -> healths */
import { UpsertHealthLeadProductUseCase } from "../app/usecases/leads/vehicles/UpsertHealthLeadProductUseCase.ts";

/*---------------------*services*---------------------*/
import { VehiclePrerequisiteService } from "../app/services/VehiclePrerequisiteService.ts";
import { HealthPrerequisiteService } from "../app/services/HealthPrerequisiteService.ts";

export function setup() {
    /**
     * INITIALIZATION
     */
    /* api */
    const api = new AxiosApiService(import.meta.env.VITE_API_URL)

    /*---------------------*repositories*---------------------*/
    const authRepository = new AuthRepository(api)
    const userRepository = new UserRepository(api)
    const teamRepository = new TeamRepository(api)
    const settingRepository = new SettingRepository(api)
    const customerRepository = new CustomerRepository(api)
    const vehicleRepository = new VehicleRepository(api)
    const healthRepository = new HealthRepository(api)

    /*---------------------*usecases*---------------------*/

    /* auths */
    const csrfUseCase = new CsrfUseCase(authRepository)
    const loginUseCase = new LoginUseCase(authRepository)
    const logoutUseCase = new LogoutUseCase(authRepository)

    /* users */
    const currentUseCase = new CurrentUseCase(userRepository)

    /* teams */
    const teamUseCase = new TeamUseCase(teamRepository)
    const upsertTeamUseCase = new UpsertTeamUseCase(teamRepository)
    const updateTeamStatusUseCase = new UpdateTeamStatusUseCase(teamRepository)
    const updateTeamPasswordUseCase = new UpdateTeamPasswordUseCase(teamRepository)
    const teamAccessedUseCase = new TeamAccessedUseCase(teamRepository)
    const upsertTeamProductAccessedUseCase = new UpsertTeamProductAccessedUseCase(teamRepository)

    /* customers */
    const customerUseCase = new CustomerUseCase(customerRepository)
    const upsertCustomerUseCase = new UpsertCustomerUseCase(customerRepository)
    const singleCustomerUseCase = new SingleCustomerUseCase(customerRepository)

    /* settings */
    const manageTeamUseCase = new ManageTeamUseCase(settingRepository)
    const insuranceProductUseCase = new InsuranceProductUseCase(settingRepository)
    const manageCustomerUseCase = new ManageCustomerUseCase(settingRepository)
    const manageUpsertCustomerUseCase = new ManageUpsertCustomerUseCase(settingRepository)

    /* lead -> vehicles */
    const upsertVehicleLeadProductUseCase = new UpsertVehicleLeadProductUseCase(vehicleRepository)
    /* lead -> healths */
    const upsertHealthLeadProductUseCase = new UpsertHealthLeadProductUseCase(healthRepository)

    /*---------------------*Services*---------------------*/
    const vehiclePrerequisiteService = new VehiclePrerequisiteService(settingRepository)
    const healthPrerequisiteService = new HealthPrerequisiteService(settingRepository)

    /**
     * CONTAINERIZATION
    */
    /* api  */
    container.register(TOKENS.ApiService, api)

    /*---------------------*repositories*---------------------*/
    container.register(TOKENS.AuthRepository, authRepository)
    container.register(TOKENS.UserRepository, userRepository)
    container.register(TOKENS.TeamRepository, teamRepository)
    container.register(TOKENS.SettingRepository, settingRepository)
    container.register(TOKENS.CustomerRepository, customerRepository)
    container.register(TOKENS.VehicleRepository, vehicleRepository)
    container.register(TOKENS.HealthRepository, healthRepository)

    /*---------------------*usecases*---------------------*/

    /* auths */
    container.register(TOKENS.CsrfUseCase, csrfUseCase)
    container.register(TOKENS.LoginUseCase, loginUseCase)
    container.register(TOKENS.LogoutUseCase, logoutUseCase)

    /* users */
    container.register(TOKENS.CurrentUseCase, currentUseCase)

    /* teams */
    container.register(TOKENS.TeamUseCase, teamUseCase)
    container.register(TOKENS.UpsertTeamUseCase, upsertTeamUseCase)
    container.register(TOKENS.UpdateTeamStatusUseCase, updateTeamStatusUseCase)
    container.register(TOKENS.UpdateTeamPasswordUseCase, updateTeamPasswordUseCase)
    container.register(TOKENS.TeamAccessedUseCase, teamAccessedUseCase)
    container.register(TOKENS.UpsertTeamProductAccessedUseCase, upsertTeamProductAccessedUseCase)

    /* customers */
    container.register(TOKENS.CustomerUseCase, customerUseCase)
    container.register(TOKENS.UpsertCustomerUseCase, upsertCustomerUseCase)
    container.register(TOKENS.SingleCustomerUseCase, singleCustomerUseCase)

    /* settings */
    container.register(TOKENS.SettingManageTeam, manageTeamUseCase)
    container.register(TOKENS.InsuranceProductUseCase, insuranceProductUseCase)
    container.register(TOKENS.ManageCustomerUseCase, manageCustomerUseCase)
    container.register(TOKENS.ManageUpsertCustomerUseCase, manageUpsertCustomerUseCase)

    /* leads -> vehicles */
    container.register(TOKENS.UpsertVehicleLeadProductUseCase, upsertVehicleLeadProductUseCase)
    /* leads -> healths */
    container.register(TOKENS.UpsertHealthLeadProductUseCase, upsertHealthLeadProductUseCase)

    /*---------------------*services*---------------------*/
    container.register(TOKENS.VehiclePrerequisiteService, vehiclePrerequisiteService)
    container.register(TOKENS.HealthPrerequisiteService, healthPrerequisiteService)

}