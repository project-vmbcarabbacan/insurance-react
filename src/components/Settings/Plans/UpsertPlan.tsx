import React from "react"
import { useAppDispatch, useAppSelector } from "../../../app/stores/hooks"
import InputField from "../../Layout/ui/Input"
import { MotionDialog } from "../../Layout/ui/Dialog"
import {
    PlanAdd,
    resetPlanForm,
    setPlanFormErrors,
    setPlanFormField,
    setPlanFormLoading,
    UpdateAdd
} from "../../../app/stores/slices/planSlice"
import type { PlanForm } from "../../../core/interfaces/Plan"
import { validatePlanForm } from "../../../core/validations/validatePlanForm"
import SelectField from "../../Layout/ui/Select"
import { selectCurrencies, selectPolicyProvider, SelectProducts } from "../../../app/stores/selectors/settingSelectors"
import AmountInput from "../../Layout/ui/Amount"

export const UpsertPlan: React.FC<{
    open: boolean
    onOpenChange: (open: boolean) => void
    onSuccess?: () => void
}> = ({ open, onOpenChange, onSuccess }) => {

    const dispatch = useAppDispatch()
    const { data, errors, is_loading } = useAppSelector(
        (state) => state.plan.form
    )

    const polict_providers = useAppSelector(selectPolicyProvider)
    const products = useAppSelector(SelectProducts)
    const currencies = useAppSelector(selectCurrencies)

    /* ------------------------ Handlers ------------------------ */

    const handleFieldChange = (field: keyof PlanForm, value: string) => {
        dispatch(setPlanFormField({ field, value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const validationErrors = validatePlanForm(data)

        if (Object.keys(validationErrors).length > 0) {
            dispatch(setPlanFormErrors(validationErrors))
            return
        }

        dispatch(setPlanFormLoading(true))

        const action = data.uuid ? UpdateAdd(data) : PlanAdd(data)
        const result = await dispatch(action)

        if (PlanAdd.fulfilled.match(result) || UpdateAdd.fulfilled.match(result)) {
            onSuccess?.()
            handleClosed()
        }
    }

    const handleClosed = () => {
        dispatch(resetPlanForm())
        onOpenChange(false)
    }

    /* ------------------------ UI ------------------------ */

    return (
        <MotionDialog preset="slide" open={open} onOpenChange={handleClosed}>
            <form onSubmit={handleSubmit} className="flex flex-col h-full">

                {/* Header */}
                <div className="px-6 py-4 border-b">
                    <h2 className="text-lg font-semibold text-gray-900">
                        {data.uuid ? "Update Plan" : "Add Plan"}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Configure insurance plan details
                    </p>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">

                    {/* Provider & Product */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <SelectField
                            id="provider_id"
                            label="Policy Provider"
                            name="provider_id"
                            value={data.provider_id}
                            options={polict_providers}
                            onChange={e => handleFieldChange('provider_id', e.target.value)}
                            error={errors.provider_id}
                            placeholder="Select provider"
                            disabled={!!data.uuid}
                        />

                        <SelectField
                            id="insurance_product_code"
                            label="Policy Product"
                            name="insurance_product_code"
                            value={data.insurance_product_code}
                            options={products}
                            onChange={e => handleFieldChange('insurance_product_code', e.target.value)}
                            error={errors.insurance_product_code}
                            placeholder="Select product"
                            disabled={!!data.uuid}
                        />

                    </div>

                    {/* Code & Name */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputField
                            id="code"
                            label="Plan Code"
                            name="code"
                            value={data.code}
                            error={errors.code}
                            maxLength={20}
                            onChange={e => handleFieldChange("code", e.target.value.toUpperCase())}
                            placeholder="e.g. BASIC001"
                        />

                        <InputField
                            id="name"
                            label="Plan Name"
                            name="name"
                            value={data.name}
                            error={errors.name}
                            maxLength={100}
                            onChange={e => handleFieldChange("name", e.target.value)}
                            placeholder="Enter plan name"
                        />
                    </div>

                    {/* Description */}
                    <InputField
                        id="description"
                        label="Description"
                        name="description"
                        value={data.description}
                        error={errors.description}
                        maxLength={255}
                        onChange={e => handleFieldChange("description", e.target.value)}
                        placeholder="Brief description of the plan"
                    />

                    {/* Pricing */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <AmountInput
                            id="base_premium"
                            label="Base Premium"
                            name="base_premium"
                            currency=""
                            value={data.base_premium}
                            error={errors.base_premium}
                            onChange={e => handleFieldChange("base_premium", e)}
                        />

                        <SelectField
                            id="currency"
                            label="Policy Currency"
                            name="currency"
                            value={data.currency}
                            options={currencies}
                            onChange={e => handleFieldChange('currency', e.target.value)}
                            error={errors.currency}
                            placeholder="Select currency"
                        />
                    </div>

                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={handleClosed}
                        className="px-4 py-2 rounded-md border text-sm font-medium text-gray-600 hover:bg-gray-100"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        disabled={is_loading}
                        className={`px-4 py-2 rounded-md text-sm font-semibold text-white transition
              ${is_loading
                                ? "bg-indigo-400 cursor-not-allowed"
                                : "bg-indigo-600 hover:bg-indigo-500"
                            }
            `}
                    >
                        {is_loading ? "Saving..." : "Save Plan"}
                    </button>
                </div>

            </form>
        </MotionDialog>
    )
}
