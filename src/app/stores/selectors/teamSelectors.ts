import { Team } from "../../../domain/entities/Team";
import type { RootState } from "../store";

export const selectTeamsAsEntities = (state: RootState) => state.team.teams.map(team =>
    new Team(
        team.uuid,
        team.name,
        team.email,
        team.status,
        team.role_name
    )
)