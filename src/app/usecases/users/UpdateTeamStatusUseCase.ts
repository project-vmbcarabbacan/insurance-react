import type { TeamStatus } from "../../../core/interfaces/Team";
import type { TeamContract } from "../../../domain/contracts/TeamContract";
import type { TeamMessageResponse } from "../../../infrastructure/dtos/TeamResponse";
import { TeamStatusError } from "../../errors/TeamStatusError";

export class UpdateTeamStatusUseCase {
    constructor(private team: TeamContract) { }

    async execute(data: TeamStatus): Promise<TeamMessageResponse> {
        try {
            return await this.team.updateTeamStatus(data);
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new TeamStatusError(error.message)
            }

            throw new TeamStatusError()
        }
    }
}