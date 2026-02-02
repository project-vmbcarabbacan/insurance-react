
export const TOKENS = {
    ApiService: "ApiService",

    /***REPOSITORIES***/
    AuthRepository: "AuthRepository",
    UserRepository: "UserRepository",
    TeamRepository: "TeamRepository",
    SettingRepository: "SettingRepository",

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

    /* SETTINGS */
    SettingManageTeam: 'SettingManageTeam',
    InsuranceProductUseCase: 'InsuranceProductUseCase',

}