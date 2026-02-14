import type { PlanForm } from "../interfaces/Plan";

export const validatePlanForm = (data: PlanForm) => {
    const errors: Partial<Record<keyof PlanForm, string>> = {}

    if (!data.code.trim()) errors.code = 'Code is required'
    if (!data.name.trim()) errors.name = 'Name is required'
    if (!data.insurance_product_code.trim()) errors.insurance_product_code = 'Product is required'
    if (!data.provider_id.trim()) errors.provider_id = 'Policy provider is required'
    if (!data.base_premium.trim()) errors.base_premium = 'Base premium is required'
    if (!data.currency.trim()) errors.currency = 'Currency is required'

    return errors
}