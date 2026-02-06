export class UpsertLeadVehicleError extends Error {
    constructor(message?: string) {
        super(message ?? 'Something went wrong');
        this.name = 'UpsertLeadVehicleError';
    }
}