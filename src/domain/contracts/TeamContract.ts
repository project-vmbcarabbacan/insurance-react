import type { AddTeam, AssignProduct, TeamFilter, TeamPassword, TeamStatus } from "../../core/interfaces/Team";
import type { TeamAccessedResponse, TeamMessageResponse, TeamResponse } from "../../infrastructure/dtos/TeamResponse";

export interface TeamContract {
    teams(data: TeamFilter): Promise<TeamResponse>
    teamAccessed(uuid: string): Promise<TeamAccessedResponse>
    createTeam(data: AddTeam): Promise<TeamMessageResponse>
    updateTeam(data: AddTeam): Promise<TeamMessageResponse>
    updateTeamStatus(data: TeamStatus): Promise<TeamMessageResponse>
    updateTeamPassword(data: TeamPassword): Promise<TeamMessageResponse>
    upsertTeamAssignProduct(data: AssignProduct): Promise<TeamMessageResponse>
}