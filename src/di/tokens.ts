
export const TOKENS = {
    ApiService: "ApiService",

    /***REPOSITORIES***/
    AuthRepository: "AuthRepository",
    UserRepository: "UserRepository",
    TeamRepository: "TeamRepository",
    SettingRepository: "SettingRepository",
    CustomerRepository: "CustomerRepository",
    VehicleRepository: "VehicleRepository",
    HealthRepository: "HealthRepository",

    /***USECASES***/

    /* AUTHS */
    CsrfUseCase: 'CsrfUseCase',
    LoginUseCase: 'LoginUseCase',
    LogoutUseCase: 'LogoutUseCase',
    /* USERS */
    CurrentUseCase: 'CurrentUseCase',
    TeamUseCase: 'TeamUseCase',
    UpsertTeamUseCase: 'UpsertTeamUseCase',
    UpdateTeamStatusUseCase: 'UpdateTeamStatusUseCase',
    UpdateTeamPasswordUseCase: 'UpdateTeamPasswordUseCase',
    TeamAccessedUseCase: 'TeamAccessedUseCase',
    UpsertTeamProductAccessedUseCase: 'UpsertTeamProductAccessedUseCase',

    /* CUSTOMERS */
    CustomerUseCase: 'CustomerUseCase',
    UpsertCustomerUseCase: 'UpsertCustomerUseCase',
    SingleCustomerUseCase: 'SingleCustomerUseCase',
    CustomerDetailUseCase: 'CustomerDetailUseCase',
    PatchCustomerUseCase: 'PatchCustomerUseCase',

    /* SETTINGS */
    SettingManageTeam: 'SettingManageTeam',
    InsuranceProductUseCase: 'InsuranceProductUseCase',
    ManageCustomerUseCase: 'ManageCustomerUseCase',
    ManageUpsertCustomerUseCase: 'ManageUpsertCustomerUseCase',

    /* Leads -> Vehicles */
    UpsertVehicleLeadProductUseCase: 'UpsertVehicleLeadProductUseCase',
    ViewVehicleLeadProductUseCase: 'ViewVehicleLeadProductUseCase',
    FindVehicleLeadProductUseCase: 'FindVehicleLeadProductUseCase',
    /* Leads -> Healths */
    UpsertHealthLeadProductUseCase: 'UpsertHealthLeadProductUseCase',
    ViewHealthLeadProductUseCase: 'ViewHealthLeadProductUseCase',
    FindHealthLeadProductUseCase: 'FindHealthLeadProductUseCase',


    /***SERVICES***/
    VehiclePrerequisiteService: 'VehiclePrerequisiteService',
    HealthPrerequisiteService: 'HealthPrerequisiteService',

}