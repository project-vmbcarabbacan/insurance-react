import { TOKENS } from "./tokens";
import { container } from "./container";

import { AxiosApiService } from "../infrastructure/api/AxiosApiService";

/*---------------------*repositories*---------------------*/
import { AuthRepository } from "../infrastructure/repositories/AuthRepository";
import { UserRepository } from "../infrastructure/repositories/UserRepository";
import { SettingRepository } from "../infrastructure/repositories/SettingRepository.ts";
import { TeamRepository } from "../infrastructure/repositories/TeamRepository.ts";

/*---------------------*usecases*---------------------*/
import { LoginUseCase } from "../app/usecases/auths/LoginUseCase";
import { LogoutUseCase } from "../app/usecases/auths/LogoutUseCase";
import { CsrfUseCase } from "../app/usecases/auths/CsrfUseCase.ts";
import { CurrentUseCase } from "../app/usecases/users/CurrentUseCase.ts";
import { TeamUseCase } from "../app/usecases/users/TeamUseCase.ts";
import { ManageTeamUseCase } from "../app/usecases/settings/ManageTeamUseCase.ts";
import { UpsertTeamUseCase } from "../app/usecases/users/UpsertTeamUseCase.ts";
import { UpdateTeamStatusUseCase } from "../app/usecases/users/UpdateTeamStatusUseCase.ts";
import { UpdateTeamPasswordUseCase } from "../app/usecases/users/UpdateTeamPasswordUseCase.ts";


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

    /* settings */
    const manageTeamUseCase = new ManageTeamUseCase(settingRepository)


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

    /* settings */
    container.register(TOKENS.SettingManageTeam, manageTeamUseCase)

}