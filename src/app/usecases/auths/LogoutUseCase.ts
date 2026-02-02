import type { AuthContract } from "../../../domain/contracts/AuthContract";

export class LogoutUseCase {
    constructor(private auth: AuthContract) { }

    async execute(): Promise<void> {
        await this.auth.logout()
    }
}