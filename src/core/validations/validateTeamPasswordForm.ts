import { Password } from "../../domain/VOs/Password";
import type { TeamPassword } from "../interfaces/Team";


export const validateTeamPasswordForm = (data: TeamPassword) => {
    const errors: Partial<Record<keyof TeamPassword, string>> = {};

    if (!data.uuid) errors.uuid = 'Uuid is required';

    if (!data.password.trim()) {
        errors.password = 'Password is required';
    } else {
        try {
            Password.create(data.password);
        } catch (e) {
            errors.password = (e as Error).message;
        }
    }

    return errors;
};
