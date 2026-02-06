import type { LeadHealthForm } from "../interfaces/LeadHealth";

export const validateLeadHealthForm = (data: LeadHealthForm) => {
    const errors: Partial<Record<string, string>> = {};

    if (!data.insurance_for) errors.insurance_for = 'Required';
    if (!data.existing_insurance) errors.existing_insurance = 'Required';
    if (!data.nationality) errors.nationality = 'Required';
    if (!data.emirates) errors.emirates = 'Required';


    if (data.insurance_for === 'self_family') {
        if (!data.insure_to) errors.insure_to = 'Required';
        if (!data.salary) errors.salary = 'Required';
    }

    if (data.insurance_for === 'investor') {
        if (!data.salary) errors.salary = 'Required';
        if (!data.gender) errors.gender = 'Required';
        if (!data.marital_status) errors.marital_status = 'Required';
        if (!data.dob) errors.dob = 'Required';
    }

    if (data.members.length === 0) {
        errors.members = 'At least one member required';
    }

    data.members.forEach((member, index) => {
        if (!member.relationship) {
            errors[`members.${index}.relationship`] = "Relationship is required";
        }
        if (!member.dob) {
            errors[`members.${index}.dob`] = "Date of Birth is required";
        }
        if (!member.gender) {
            errors[`members.${index}.gender`] = "Gender is required";
        }
    });

    return errors;
};
