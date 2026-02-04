import { Email } from "../../domain/VOs/Email";
import type { UpsertCustomer } from "../interfaces/Customer";


export const validateCustomerForm = (data: UpsertCustomer) => {
    const errors: Partial<Record<keyof UpsertCustomer, string>> = {};


    if (!data.phone_number.trim()) errors.phone_number = 'Phone number is required';
    if (!data.phone_country_code.trim()) errors.phone_country_code = 'Country code is required';
    if (!data.type.trim()) errors.type = 'Type is required';
    if (!data.customer_source.trim()) errors.customer_source = 'Customer source is required';

    if (data.type === 'corporate') {
        if (!data?.company_name?.trim()) errors.company_name = 'Company name is required';
        if (!data?.contact_person?.trim()) errors.contact_person = 'Contact person is required';
        if (!data?.registration_no?.trim()) errors.registration_no = 'Registration number is required';
    }

    if (data.type === 'individual') {
        if (!data?.first_name?.trim()) errors.first_name = 'First name is required';
        if (!data?.last_name?.trim()) errors.last_name = 'Last name is required';
        if (!data?.dob?.trim()) errors.dob = 'Date of birth is required';
        if (!data.gender.trim()) errors.gender = 'Gender is required';
    }

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
