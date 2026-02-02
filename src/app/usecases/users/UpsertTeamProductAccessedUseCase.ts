import type { AssignProduct } from "../../../core/interfaces/Team";
import type { TeamContract } from "../../../domain/contracts/TeamContract";
import type { TeamMessageResponse } from "../../../infrastructure/dtos/TeamResponse";
import { UpsertTeamAssignProductError } from "../../errors/UpsertTeamAssignProductError";

export class UpsertTeamProductAccessedUseCase {
    constructor(private team: TeamContract) { }

    async execute(data: AssignProduct): Promise<TeamMessageResponse> {
        try {
            return await this.team.upsertTeamAssignProduct(data);
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new UpsertTeamAssignProductError(error.message)
            }

            throw new UpsertTeamAssignProductError()
        }


    }
}