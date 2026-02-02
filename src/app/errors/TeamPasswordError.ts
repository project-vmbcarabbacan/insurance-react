export class TeamPasswordError extends Error {
    constructor(message?: string) {
        super(message ?? 'Something went wrong');
        this.name = 'TeamPasswordError';
    }
}