import { PasswordInvalidError } from "../errors/PasswordInvalidError";

export class Password {
    private readonly password: string;

    constructor(password: string) {
        this.password = password;
    }

    public static create(password: string): Password {
        if (!this.isValidPassword(password)) {
            throw new PasswordInvalidError(
                'Password must be at least 8 characters long and include at least one letter, one number, and one special character (@#$%!^&*(){}[].,).'
            );
        }

        return new Password(password);
    }

    public get value(): string {
        return this.password;
    }

    public toString(): string {
        return '[PROTECTED]';
    }

    public equals(other: Password): boolean {
        return this.password === other.password;
    }

    private static isValidPassword(password: string): boolean {
        const minLength = 8;
        const hasLetter = /[a-zA-Z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecial = /[@#$%!^&*()\[\]{}.,]/.test(password);

        return password.length >= minLength && hasLetter && hasNumber && hasSpecial;
    }
}
