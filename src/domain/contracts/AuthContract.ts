import type { User } from "../entities/User";
import type { Email } from "../VOs/Email";
import type { Password } from "../VOs/Password";

export interface AuthContract {
    csrf(): Promise<void>
    login(email: Email, password: Password): Promise<User>
    logout(): Promise<void>
}