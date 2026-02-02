import type { TeamContract } from "../../../domain/contracts/TeamContract";
import type { TeamAccessedResponse } from "../../../infrastructure/dtos/TeamResponse";

export class TeamAccessedUseCase {
    constructor(private team: TeamContract) { }

    async execute(uuid: string): Promise<TeamAccessedResponse> {
        return await this.team.teamAccessed(uuid)
    }
}