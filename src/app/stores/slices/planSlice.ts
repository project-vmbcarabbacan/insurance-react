import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { PlanForm, PlanPagination, PlanPaginationResponse, PlanResponse, PlanSearchResponse, PlanStatus } from "../../../core/interfaces/Plan";
import { API_URL } from "../../../infrastructure/api/Urls";
import type { PlanService } from "../../services/PlanService";
import { TOKENS } from "../../../di/tokens";
import { container } from "../../../di/container";

interface PlanFormState {
    data: PlanForm,
    errors: Partial<Record<keyof PlanForm, string>>
    is_loading: boolean
}

interface PlanState {
    plans: PlanResponse[]
    plan: PlanResponse
    current_page: number
    last_page: number
    total: number
    form: PlanFormState
}

const emptyFormData: PlanForm = {
    uuid: '',
    provider_id: '',
    insurance_product_code: '',
    code: '',
    name: '',
    description: '',
    base_premium: '',
    currency: ''
}

const initialState: PlanState = {
    plans: [],
    plan: {} as PlanResponse,
    current_page: 1,
    last_page: 1,
    total: 1,
    form: {
        data: emptyFormData,
        errors: {},
        is_loading: false
    }
}

export const PlanPaginate = createAsyncThunk(
    API_URL.setting.plan.pagination,
    async (data: PlanPagination) => {
        const plan = container.resolve<PlanService>(TOKENS.PlanService)
        return await plan.paginate(data)
    }
)

export const UpdatePlan = createAsyncThunk(
    API_URL.setting.plan.updatePlan,
    async (uuid: string) => {
        const plan = container.resolve<PlanService>(TOKENS.PlanService)
        return await plan.updatePlan(uuid)
    }
)

export const AddPlan = createAsyncThunk(
    API_URL.setting.plan.addPlan,
    async (code: string) => {
        const plan = container.resolve<PlanService>(TOKENS.PlanService)
        return await plan.addPlan(code)
    }
)

export const PlanAdd = createAsyncThunk(
    API_URL.setting.plan.store,
    async (data: PlanForm) => {
        const plan = container.resolve<PlanService>(TOKENS.PlanService)
        return await plan.add(data)
    }
)

export const UpdateAdd = createAsyncThunk(
    API_URL.setting.plan.update,
    async (data: PlanForm) => {
        const plan = container.resolve<PlanService>(TOKENS.PlanService)
        return await plan.update(data)
    }
)

export const PlanUpdateStatus = createAsyncThunk(
    API_URL.setting.plan.status,
    async (data: PlanStatus) => {
        const plan = container.resolve<PlanService>(TOKENS.PlanService)
        return await plan.status(data)
    }
)


const planSlice = createSlice({
    name: 'plan',
    initialState,
    reducers: {
        setPlanFormField(
            state: PlanState,
            action: PayloadAction<{ field: keyof PlanForm; value: string }>
        ) {
            state.form.data[action.payload.field] = action.payload.value
            delete state.form.errors[action.payload.field]
        },
        setPlanFormErrors(
            state: PlanState,
            action: PayloadAction<PlanState['form']['errors']>
        ) {
            state.form.errors = action.payload
        },
        setPlanFormLoading(
            state: PlanState,
            action: PayloadAction<boolean>
        ) {
            state.form.is_loading = action.payload
        },
        resetPlanForm(state) {
            state.form = {
                data: emptyFormData,
                errors: {},
                is_loading: false
            }
        }
    },
    extraReducers: builder => {
        builder
            .addCase(PlanPaginate.fulfilled, (state: PlanState, action: PayloadAction<PlanPaginationResponse>) => {
                state.plans = action.payload.data.plans.data
                state.current_page = action.payload.data.plans.current_page
                state.last_page = action.payload.data.plans.last_page
                state.total = action.payload.data.plans.total
            });

        const handleSubmitFulfilled = (state: PlanState, action: PayloadAction<PlanSearchResponse>) => {
            state.form.data = action.payload.data.plan
        }

        builder
            .addCase(UpdatePlan.fulfilled, handleSubmitFulfilled)
            .addCase(AddPlan.fulfilled, handleSubmitFulfilled)
    }
})

export const {
    setPlanFormField,
    setPlanFormErrors,
    setPlanFormLoading,
    resetPlanForm
} = planSlice.actions

export default planSlice.reducer