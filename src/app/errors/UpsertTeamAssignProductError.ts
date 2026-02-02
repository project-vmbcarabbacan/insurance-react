export class UpsertTeamAssignProductError extends Error {
    constructor(message?: string) {
        super(message ?? 'Something went wrong');
        this.name = 'UpsertTeamAssignProductError';
    }
}