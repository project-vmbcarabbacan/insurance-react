import type { UserContract } from "../../../domain/contracts/UserContract";
import type { User } from "../../../domain/entities/User";

export class CurrentUseCase {
    constructor(private user: UserContract) { }

    async execute(): Promise<User> {
        return await this.user.loggedinUser();
    }
}