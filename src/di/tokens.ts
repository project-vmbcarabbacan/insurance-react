
export const TOKENS = {
    ApiService: "ApiService",

    /***REPOSITORIES***/
    AuthRepository: "AuthRepository",
    UserRepository: "UserRepository",
    TeamRepository: "TeamRepository",
    SettingRepository: "SettingRepository",
    CustomerRepository: "CustomerRepository",

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

    /* SETTINGS */
    SettingManageTeam: 'SettingManageTeam',
    InsuranceProductUseCase: 'InsuranceProductUseCase',
    ManageCustomerUseCase: 'ManageCustomerUseCase',
    ManageUpsertCustomerUseCase: 'ManageUpsertCustomerUseCase',

}