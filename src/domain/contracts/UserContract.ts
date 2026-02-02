import type { User } from "../entities/User";

export interface UserContract {
    loggedinUser(): Promise<User>
}