import { Email } from "../../domain/VOs/Email";
import type { UpsertCustomer } from "../interfaces/Customer";


export const validateCustomerForm = (data: UpsertCustomer) => {
    const errors: Partial<Record<keyof UpsertCustomer, string>> = {};

    if (!data.first_name.trim()) errors.first_name = 'First name is required';
    if (!data.last_name.trim()) errors.last_name = 'Last name is required';
    if (!data.phone_number.trim()) errors.phone_number = 'Phone number is required';
    if (!data.phone_country_code.trim()) errors.phone_country_code = 'Country code is required';
    if (!data.type.trim()) errors.type = 'Type is required';
    if (!data.dob.trim()) errors.dob = 'Date of birth is required';
    if (!data.gender.trim()) errors.gender = 'Gender is required';

    if (!data.email.trim()) {
        errors.email = 'Email is required';
    } else {
        try {
            Email.create(data.email);
        } catch (e) {
            errors.email = (e as Error).message;
        }
    }

    return errors;
};
