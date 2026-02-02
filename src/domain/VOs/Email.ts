import { EmailInvalidError } from "../errors/EmailInvalidError";

export class Email {
    private readonly email: string;

    constructor(email: string) {
        this.email = email;
    }

    public static create(email: string): Email {
        if (!this.isValidEmail(email)) {
            throw new EmailInvalidError(email);
        }

        return new Email(email);
    }

    public get value(): string {
        return this.email;
    }

    private static isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    public equals(other: Email): boolean {
        return this.email.toLowerCase() === other.email.toLowerCase();
    }

    public toString(): string {
        return this.email;
    }
}
