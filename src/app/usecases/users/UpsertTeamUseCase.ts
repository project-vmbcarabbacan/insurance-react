import type { AddTeam } from "../../../core/interfaces/Team";
import type { TeamContract } from "../../../domain/contracts/TeamContract";
import type { TeamMessageResponse } from "../../../infrastructure/dtos/TeamResponse";
import { AddTeamError } from "../../errors/AddTeamError";

export class UpsertTeamUseCase {
    constructor(private team: TeamContract) { }

    async execute(data: AddTeam): Promise<TeamMessageResponse> {
        if (!data.email || !data.name || !data.role_slug) throw new Error('Invalid input')
        try {
            if (data.uuid) {
                return await this.team.updateTeam(data);
            } else {
                return await this.team.createTeam(data);
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new AddTeamError(error.message)
            }

            throw new AddTeamError()
        }


    }
}