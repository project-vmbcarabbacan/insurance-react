export class AddTeamError extends Error {
    constructor(message?: string) {
        super(message ?? 'Something went wrong');
        this.name = 'AddTeamError';
    }
}