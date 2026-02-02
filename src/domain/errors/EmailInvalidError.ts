export class EmailInvalidError extends Error {
    constructor(email: string) {
        super(`Invalid email: ${email}`);
        this.name = 'EmailInvalidError';
    }
}
