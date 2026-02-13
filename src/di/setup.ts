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
import { LeadRepository } from "../infrastructure/repositories/LeadRepository.ts";
import { DocumentRepository } from "../infrastructure/repositories/DocumentRepository.ts";
import { AuditRepository } from "../infrastructure/repositories/AuditRepository.ts";
import { PolicyProviderRepository } from "../infrastructure/repositories/PolicyProviderRepository.ts";

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
import { CustomerDetailUseCase } from "../app/usecases/customers/CustomerDetailUseCase.ts";
import { PatchCustomerUseCase } from "../app/usecases/customers/PatchCustomerUseCase.ts";
/* settings */
import { ManageTeamUseCase } from "../app/usecases/settings/ManageTeamUseCase.ts";
import { InsuranceProductUseCase } from "../app/usecases/settings/InsuranceProductUseCase.ts";
import { ManageCustomerUseCase } from "../app/usecases/settings/ManageCustomerUseCase.ts";
import { ManageUpsertCustomerUseCase } from "../app/usecases/settings/ManageUpsertCustomerUseCase.ts";
import { ManageCustomerDetailUseCase } from "../app/usecases/settings/ManageCustomerDetailUseCase.ts";
import { ManageLeadActivityUseCase } from "../app/usecases/settings/ManageLeadActivityUseCase.ts";
/* leads  */
import { LeadActivityUseCase } from "../app/usecases/leads/LeadActivityUseCase.ts";
import { LeadsUseCase } from "../app/usecases/leads/LeadsUseCase.ts";
/* leads -> vehicles */
import { UpsertVehicleLeadProductUseCase } from "../app/usecases/leads/vehicles/UpsertVehicleLeadProductUseCase.ts";
import { ViewVehicleLeadProductUseCase } from "../app/usecases/leads/vehicles/ViewVehicleLeadProductUseCase.ts";
import { FindVehicleLeadProductUseCase } from "../app/usecases/leads/vehicles/FindVehicleLeadProductUseCase.ts";
/* leads -> healths */
import { UpsertHealthLeadProductUseCase } from "../app/usecases/leads/healths/UpsertHealthLeadProductUseCase.ts";
import { ViewHealthLeadProductUseCase } from "../app/usecases/leads/healths/ViewHealthLeadProductUseCase.ts";
import { FindHealthLeadProductUseCase } from "../app/usecases/leads/healths/FindHealthLeadProductUseCase.ts";

/*---------------------*services*---------------------*/
import { VehiclePrerequisiteService } from "../app/services/VehiclePrerequisiteService.ts";
import { HealthPrerequisiteService } from "../app/services/HealthPrerequisiteService.ts";
import { LeadService } from "../app/services/LeadService.ts";
import { DocumentService } from "../app/services/DocumentService.ts";
import { AuditService } from "../app/services/AuditService.ts";
import { PolicyProviderService } from "../app/services/PolicyProviderService.ts";

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
    const leadRepository = new LeadRepository(api)
    const documentRepository = new DocumentRepository(api)
    const auditRepository = new AuditRepository(api)
    const policyProviderRepository = new PolicyProviderRepository(api)

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
    const customerDetailUseCase = new CustomerDetailUseCase(customerRepository)
    const patchCustomerUseCase = new PatchCustomerUseCase(customerRepository)

    /* settings */
    const manageTeamUseCase = new ManageTeamUseCase(settingRepository)
    const insuranceProductUseCase = new InsuranceProductUseCase(settingRepository)
    const manageCustomerUseCase = new ManageCustomerUseCase(settingRepository)
    const manageUpsertCustomerUseCase = new ManageUpsertCustomerUseCase(settingRepository)
    const manageCustomerDetailUseCase = new ManageCustomerDetailUseCase(settingRepository)
    const manageLeadActivityUseCase = new ManageLeadActivityUseCase(settingRepository)

    /* lead  */
    const leadActivityUseCase = new LeadActivityUseCase(leadRepository)
    const leadsUseCase = new LeadsUseCase(leadRepository)
    /* lead -> vehicles */
    const upsertVehicleLeadProductUseCase = new UpsertVehicleLeadProductUseCase(vehicleRepository)
    const viewVehicleLeadProductUseCase = new ViewVehicleLeadProductUseCase(vehicleRepository)
    const findVehicleLeadProductUseCase = new FindVehicleLeadProductUseCase(vehicleRepository)
    /* lead -> healths */
    const upsertHealthLeadProductUseCase = new UpsertHealthLeadProductUseCase(healthRepository)
    const viewHealthLeadProductUseCase = new ViewHealthLeadProductUseCase(healthRepository)
    const findHealthLeadProductUseCase = new FindHealthLeadProductUseCase(healthRepository)

    /*---------------------*Services*---------------------*/
    const vehiclePrerequisiteService = new VehiclePrerequisiteService(settingRepository)
    const healthPrerequisiteService = new HealthPrerequisiteService(settingRepository)
    const leadService = new LeadService(leadRepository)
    const documentService = new DocumentService(documentRepository)
    const auditService = new AuditService(auditRepository)
    const policyProviderService = new PolicyProviderService(policyProviderRepository)

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
    container.register(TOKENS.LeadRepository, leadRepository)
    container.register(TOKENS.DocumentRepository, documentRepository)
    container.register(TOKENS.AuditRepository, auditRepository)
    container.register(TOKENS.PolicyProviderRepository, policyProviderRepository)

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
    container.register(TOKENS.CustomerDetailUseCase, customerDetailUseCase)
    container.register(TOKENS.PatchCustomerUseCase, patchCustomerUseCase)

    /* settings */
    container.register(TOKENS.SettingManageTeam, manageTeamUseCase)
    container.register(TOKENS.InsuranceProductUseCase, insuranceProductUseCase)
    container.register(TOKENS.ManageCustomerUseCase, manageCustomerUseCase)
    container.register(TOKENS.ManageUpsertCustomerUseCase, manageUpsertCustomerUseCase)
    container.register(TOKENS.ManageCustomerDetailUseCase, manageCustomerDetailUseCase)
    container.register(TOKENS.ManageLeadActivityUseCase, manageLeadActivityUseCase)

    /* leads  */
    container.register(TOKENS.LeadActivityUseCase, leadActivityUseCase)
    container.register(TOKENS.LeadsUseCase, leadsUseCase)
    /* leads -> vehicles */
    container.register(TOKENS.UpsertVehicleLeadProductUseCase, upsertVehicleLeadProductUseCase)
    container.register(TOKENS.ViewVehicleLeadProductUseCase, viewVehicleLeadProductUseCase)
    container.register(TOKENS.FindVehicleLeadProductUseCase, findVehicleLeadProductUseCase)
    /* leads -> healths */
    container.register(TOKENS.UpsertHealthLeadProductUseCase, upsertHealthLeadProductUseCase)
    container.register(TOKENS.ViewHealthLeadProductUseCase, viewHealthLeadProductUseCase)
    container.register(TOKENS.FindHealthLeadProductUseCase, findHealthLeadProductUseCase)

    /*---------------------*services*---------------------*/
    container.register(TOKENS.VehiclePrerequisiteService, vehiclePrerequisiteService)
    container.register(TOKENS.HealthPrerequisiteService, healthPrerequisiteService)
    container.register(TOKENS.LeadService, leadService)
    container.register(TOKENS.DocumentService, documentService)
    container.register(TOKENS.AuditService, auditService)
    container.register(TOKENS.PolicyProviderService, policyProviderService)

}