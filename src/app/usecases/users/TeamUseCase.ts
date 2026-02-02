import type { TeamFilter } from "../../../core/interfaces/Team";
import type { TeamContract } from "../../../domain/contracts/TeamContract";
import type { TeamResponse } from "../../../infrastructure/dtos/TeamResponse";

export class TeamUseCase {
    constructor(private team: TeamContract) { }

    async execute(data: TeamFilter): Promise<TeamResponse> {
        return await this.team.teams(data);
    }
}