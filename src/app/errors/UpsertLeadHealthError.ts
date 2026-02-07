export class UpsertLeadHealthError extends Error {
    constructor(message?: string) {
        super(message ?? 'Something went wrong');
        this.name = 'UpsertLeadHealthError';
    }
}