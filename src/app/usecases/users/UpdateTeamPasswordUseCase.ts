import type { TeamPassword } from "../../../core/interfaces/Team";
import type { TeamContract } from "../../../domain/contracts/TeamContract";
import type { TeamMessageResponse } from "../../../infrastructure/dtos/TeamResponse";
import { TeamPasswordError } from "../../errors/TeamPasswordError";

export class UpdateTeamPasswordUseCase {
    constructor(private team: TeamContract) { }

    async execute(data: TeamPassword): Promise<TeamMessageResponse> {
        try {
            console.log({ data })
            return await this.team.updateTeamPassword(data);
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new TeamPasswordError(error.message)
            }

            throw new TeamPasswordError()
        }
    }
}