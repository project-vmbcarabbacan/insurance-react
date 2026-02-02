import type { Login } from "../../../core/interfaces/Auth"
import type { AuthContract } from "../../../domain/contracts/AuthContract"
import type { User } from "../../../domain/entities/User"
import { Email } from "../../../domain/VOs/Email"
import { Password } from "../../../domain/VOs/Password"
import { LoginFailedError } from "../../errors/LoginFailedError"

export class LoginUseCase {
    constructor(private auth: AuthContract) { }

    async execute(data: Login): Promise<User> {
        if (!data.email || !data.password) throw new Error('Invalid input')

        try {
            const email = Email.create(data.email)
            const password = Password.create(data.password)
            return await this.auth.login(email, password)
        } catch (error: unknown) {
            // Handle errors properly
            if (error instanceof Error) {
                // Wrap in domain-specific error or rethrow
                throw new LoginFailedError(error.message)
            }
            // If unknown error, throw a generic one
            throw new LoginFailedError()
        }
    }
}