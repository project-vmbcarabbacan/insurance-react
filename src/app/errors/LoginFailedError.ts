export class LoginFailedError extends Error {
    constructor(message?: string) {
        super(message ?? 'Login failed');
        this.name = 'LoginFailedError';
    }
}