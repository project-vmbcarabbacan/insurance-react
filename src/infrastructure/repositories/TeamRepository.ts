import type { ApiService } from "../api/ApiService";
import { API_URL } from "../api/Urls";
import type { TeamContract } from "../../domain/contracts/TeamContract";
import type { TeamAccessedResponse, TeamMessageResponse, TeamResponse } from "../dtos/TeamResponse";
import type { AddTeam, AssignProduct, TeamFilter, TeamPassword, TeamStatus } from "../../core/interfaces/Team";

export class TeamRepository implements TeamContract {
    constructor(private api: ApiService) { }

    async teams(data: TeamFilter): Promise<TeamResponse> {
        const response = await this.api.get<TeamResponse>(`/${API_URL.user.teams}`, {
            params: { ...data }
        })
        return response
    }

    async teamAccessed(uuid: string): Promise<TeamAccessedResponse> {
        return await this.api.get<TeamAccessedResponse>(`/${API_URL.user.accessed}/${uuid}`)
    }

    async createTeam(data: AddTeam): Promise<TeamMessageResponse> {
        return await this.api.post<TeamMessageResponse>(`/${API_URL.user.teams}`, data)
    }

    async updateTeam(data: AddTeam): Promise<TeamMessageResponse> {
        const { uuid, ...payload } = data
        return await this.api.put<TeamMessageResponse>(`/${API_URL.user.teams}/${uuid}`, payload)
    }

    async updateTeamStatus(data: TeamStatus): Promise<TeamMessageResponse> {
        return await this.api.patch<TeamMessageResponse>(`/${API_URL.user.teamStatus}`, data)
    }

    async updateTeamPassword(data: TeamPassword): Promise<TeamMessageResponse> {
        const { uuid, ...payload } = data
        return await this.api.patch<TeamMessageResponse>(`/${API_URL.user.password}/${uuid}`, payload)
    }

    async upsertTeamAssignProduct(data: AssignProduct): Promise<TeamMessageResponse> {
        const { uuid, ...payload } = data
        return await this.api.patch<TeamMessageResponse>(`/${API_URL.user.assignAccessed}/${uuid}`, payload)

    }

}