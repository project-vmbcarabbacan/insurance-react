import type { ApiService } from "../api/ApiService";
import type { UserResponse } from "../dtos/UserResponse";
import type { Email } from "../../domain/VOs/Email";
import { User } from "../../domain/entities/User";
import type { Password } from "../../domain/VOs/Password";
import type { AuthContract } from "../../domain/contracts/AuthContract";
import { API_URL } from "../api/Urls";

export class AuthRepository implements AuthContract {
    constructor(private api: ApiService) { }

    async csrf(): Promise<void> {
        await this.api.get(`/${API_URL.csrf}`)
    }

    async login(email: Email, password: Password): Promise<User> {
        const response = await this.api.post<UserResponse>(`/${API_URL.auth.login}`, { email: email.value, password: password.value })

        const user = response.user
        return new User(
            user.uuid,
            user.name,
            user.initals,
            user.email,
            user.status,
            user.role_slug,
            user.role_name,
            user.permissions,
        )
    }

    async logout(): Promise<void> {
        await this.api.post(`/${API_URL.auth.logout}`)

    }
}