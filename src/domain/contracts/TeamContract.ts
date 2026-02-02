import type { AddTeam, TeamFilter, TeamPassword, TeamStatus } from "../../core/interfaces/Team";
import type { TeamMessageResponse, TeamResponse } from "../../infrastructure/dtos/TeamResponse";

export interface TeamContract {
    teams(data: TeamFilter): Promise<TeamResponse>
    createTeam(data: AddTeam): Promise<TeamMessageResponse>
    updateTeam(data: AddTeam): Promise<TeamMessageResponse>
    updateTeamStatus(data: TeamStatus): Promise<TeamMessageResponse>
    updateTeamPassword(data: TeamPassword): Promise<TeamMessageResponse>
}