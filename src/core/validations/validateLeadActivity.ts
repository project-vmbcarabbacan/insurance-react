import type { LeadActivity } from "../interfaces/Lead";

export const validateLeadActivity = (data: LeadActivity) => {
    const errors: Partial<Record<keyof LeadActivity, string>> = {};

    if (!data.activity_response) {
        errors.activity_response = "Activity response is required";
    }

    if (!data.communication_preference) {
        errors.communication_preference = "Communication preference is required";
    }

    if (!data.notes) {
        errors.notes = "Notes is required";
    }

    return errors;
}