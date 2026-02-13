import type { PolicyForm } from "../interfaces/Policy";

export const validatePolicyProviderForm = (data: PolicyForm) => {
    const errors: Partial<Record<keyof PolicyForm, string>> = {}

    if (!data.code.trim()) errors.code = 'Code is required'
    if (!data.name.trim()) errors.name = 'Policy name is required'

    return errors
}