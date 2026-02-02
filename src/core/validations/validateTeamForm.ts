import { Email } from "../../domain/VOs/Email";
import { Password } from "../../domain/VOs/Password";
import type { AddTeam } from "../interfaces/Team";


export const validateTeamForm = (data: AddTeam) => {
    const errors: Partial<Record<keyof AddTeam, string>> = {};

    if (!data.name.trim()) errors.name = 'Name is required';
    if (!data.role_slug.trim()) errors.role_slug = 'Role is required';

    if (!data.email.trim()) {
        errors.email = 'Email is required';
    } else {
        try {
            Email.create(data.email);
        } catch (e) {
            errors.email = (e as Error).message;
        }
    }

    if (!data.uuid) {
        if (!data.password.trim()) {
            errors.password = 'Password is required';
        } else {
            try {
                Password.create(data.password);
            } catch (e) {
                errors.password = (e as Error).message;
            }
        }
    }

    return errors;
};
