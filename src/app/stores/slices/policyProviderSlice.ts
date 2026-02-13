import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { PolicyForm, PolicyPagination, PolicyPaginationResponse, PolicyResponse, PolicySearchResponse, PolicyStatus } from "../../../core/interfaces/Policy";
import { API_URL } from "../../../infrastructure/api/Urls";
import { container } from "../../../di/container";
import { PolicyProviderService } from "../../services/PolicyProviderService";
import { TOKENS } from "../../../di/tokens";

interface PolicyProviderFormState {
    data: PolicyForm,
    errors: Partial<Record<keyof PolicyForm, string>>
    is_loading: boolean
}

interface PolicyProviderState {
    providers: PolicyResponse[]
    provider: PolicyResponse
    current_page: number
    last_page: number
    total: number
    form: PolicyProviderFormState
}

const emptyFormData: PolicyForm = {
    uuid: '',
    code: '',
    name: '',
    email: '',
    phone: ''
}

const initialState: PolicyProviderState = {
    providers: [],
    provider: {} as PolicyResponse,
    current_page: 1,
    last_page: 1,
    total: 1,
    form: {
        data: emptyFormData,
        errors: {},
        is_loading: false
    }
}

export const PolicyPaginate = createAsyncThunk(
    API_URL.setting.provider.pagination,
    async (data: PolicyPagination) => {
        const policy = container.resolve<PolicyProviderService>(TOKENS.PolicyProviderService)
        return await policy.paginate(data)
    }
)

export const Policyadd = createAsyncThunk(
    API_URL.setting.provider.store,
    async (data: PolicyForm) => {
        const policy = container.resolve<PolicyProviderService>(TOKENS.PolicyProviderService)
        return await policy.add(data)
    }
)

export const PolicyUpdate = createAsyncThunk(
    API_URL.setting.provider.update,
    async (data: PolicyForm) => {
        const policy = container.resolve<PolicyProviderService>(TOKENS.PolicyProviderService)
        return await policy.update(data)
    }
)

export const PolicySearch = createAsyncThunk(
    API_URL.setting.provider.search,
    async (uuid: string) => {
        const policy = container.resolve<PolicyProviderService>(TOKENS.PolicyProviderService)
        return await policy.search(uuid)
    }
)

export const PolicyUpdateStatus = createAsyncThunk(
    API_URL.setting.provider.status,
    async (data: PolicyStatus) => {
        const policy = container.resolve<PolicyProviderService>(TOKENS.PolicyProviderService)
        return await policy.status(data)
    }
)

const policyProviderSlice = createSlice({
    name: 'policy_provider',
    initialState,
    reducers: {
        setPolicyProviderFormField(
            state,
            action: PayloadAction<{ field: keyof PolicyForm; value: string }>
        ) {
            state.form.data[action.payload.field] = action.payload.value
            delete state.form.errors[action.payload.field]
        },
        setPolicyProviderFormErrors(
            state,
            action: PayloadAction<PolicyProviderState['form']['errors']>
        ) {
            state.form.errors = action.payload
        },
        setPolicyProviderFormLoading(state, action: PayloadAction<boolean>) {
            state.form.is_loading = action.payload
        },
        resetPolicyProviderForm(state) {
            state.form = {
                data: emptyFormData,
                errors: {},
                is_loading: false
            }
        }
    },
    extraReducers: builder => {
        builder
            .addCase(PolicyPaginate.fulfilled, (state: PolicyProviderState, action: PayloadAction<PolicyPaginationResponse>) => {
                state.providers = action.payload.data.policy_providers.data
                state.current_page = action.payload.data.policy_providers.current_page
                state.last_page = action.payload.data.policy_providers.last_page
                state.total = action.payload.data.policy_providers.total
            })
            .addCase(PolicySearch.fulfilled, (state: PolicyProviderState, action: PayloadAction<PolicySearchResponse>) => {
                state.provider = action.payload.data.policy_provider
            })
    }
})

export const {
    setPolicyProviderFormField,
    setPolicyProviderFormErrors,
    resetPolicyProviderForm,
    setPolicyProviderFormLoading
} = policyProviderSlice.actions

export default policyProviderSlice.reducer