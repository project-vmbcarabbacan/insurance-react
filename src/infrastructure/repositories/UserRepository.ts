import type { ApiService } from "../api/ApiService";
import type { UserResponse } from "../dtos/UserResponse";
import { User } from "../../domain/entities/User";
import type { UserContract } from "../../domain/contracts/UserContract";
import { API_URL } from "../api/Urls";

export class UserRepository implements UserContract {
    constructor(private api: ApiService) { }

    async loggedinUser(): Promise<User> {
        const response = await this.api.get<UserResponse>(`/${API_URL.user.current}`)

        const user = response.user
        return new User(
            user.uuid,
            user.name,
            user.initials,
            user.email,
            user.status,
            user.role_slug,
            user.role_name,
            user.permissions,
        )
    }

}