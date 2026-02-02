import type { AuthContract } from "../../../domain/contracts/AuthContract";

export class CsrfUseCase {
    constructor(private auth: AuthContract) { }

    async execute(): Promise<void> {
        return await this.auth.csrf()
    }
}