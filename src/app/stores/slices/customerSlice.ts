import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Customer, CustomerFilter, UpsertCustomer } from "../../../core/interfaces/Customer";
import { API_URL } from "../../../infrastructure/api/Urls";
import { container } from "../../../di/container";
import type { CustomerUseCase } from "../../usecases/customers/CustomerUseCase";
import { TOKENS } from "../../../di/tokens";
import type { CustomerResponse, SingleCustomerResponse } from "../../../infrastructure/dtos/CustomerResponse";
import type { UpsertCustomerUseCase } from "../../usecases/customers/UpsertCustomerUseCase";
import { UpsertCustomerError } from "../../errors/UpsertCustomerError";
import type { SingleCustomerUseCase } from "../../usecases/customers/SingleCustomerUseCase";

interface CustomerFormState {
    data: UpsertCustomer
    errors: Partial<Record<keyof UpsertCustomer, string>>;
    isLoading: boolean;
    serverError: string | null;
}

interface CustomerState {
    status: 'idle' | 'loading' | 'ready'
    customers: Customer[]
    current_page: number
    last_page: number
    total: number
    submit_status: 'idle' | 'loading' | 'completed'
    form: CustomerFormState
}

const emptyFormData: UpsertCustomer = {
    first_name: '',
    last_name: '',
    phone_number: '',
    phone_country_code: '+971',
    email: '',
    type: '',
    dob: '',
    gender: '',
};

const initialState: CustomerState = {
    status: 'idle',
    customers: [],
    current_page: 1,
    last_page: 1,
    total: 1,
    submit_status: 'idle',
    form: {
        data: emptyFormData,
        errors: {},
        isLoading: false,
        serverError: null,
    }
}

export const CustomerPagination = createAsyncThunk(
    `${API_URL.customer.customers}-get`,
    async (data: CustomerFilter, { rejectWithValue }) => {
        try {
            const customerUseCase = container.resolve<CustomerUseCase>(TOKENS.CustomerUseCase)
            return await customerUseCase.execute(data)
        } catch (error: unknown) {
            return rejectWithValue('Unexpected api error');
        }
    }
)

export const SingleCustomer = createAsyncThunk(
    `${API_URL.customer.customers}-get-single`,
    async (uuid: string, { rejectWithValue }) => {
        try {
            const single = container.resolve<SingleCustomerUseCase>(TOKENS.SingleCustomerUseCase)
            return await single.execute(uuid)
        } catch (error: unknown) {
            return rejectWithValue('Unexpected api error');
        }
    }
)

export const UpsertCustomerPost = createAsyncThunk(
    `${API_URL.user.teams}-post-patch`,
    async (data: UpsertCustomer, { rejectWithValue }) => {
        try {
            const upsert = container.resolve<UpsertCustomerUseCase>(TOKENS.UpsertCustomerUseCase)
            return await upsert.execute(data)
        } catch (error: unknown) {
            if (error instanceof UpsertCustomerError) {
                return rejectWithValue(error.message || 'Something went wrong')
            }

            return rejectWithValue(error?.message);
        }
    }
)


const customerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {
        setCustomerFormField(
            state,
            action: PayloadAction<{ field: keyof UpsertCustomer; value: string }>
        ) {
            state.form.data[action.payload.field] = action.payload.value;
            delete state.form.errors[action.payload.field];
        },
        setCustomerFormErrors(
            state,
            action: PayloadAction<CustomerState['form']['errors']>
        ) {
            state.form.errors = action.payload;
        },
        setCustomerFormLoading(state, action: PayloadAction<boolean>) {
            state.form.isLoading = action.payload;
        },

        setCustomerFormServerError(state, action: PayloadAction<string | null>) {
            state.form.serverError = action.payload;
        },
        resetCustomerForm(state) {
            state.form = {
                data: emptyFormData,
                errors: {},
                isLoading: false,
                serverError: null,
            };
        },
    },
    extraReducers: builder => {
        builder
            .addCase(CustomerPagination.pending, state => {
                state.status = 'loading'
            })
            .addCase(CustomerPagination.fulfilled, (state: CustomerState, action: PayloadAction<CustomerResponse>) => {
                state.customers = action.payload.data.data
                state.status = 'ready'
                state.current_page = action.payload.data.current_page
                state.last_page = action.payload.data.last_page
                state.total = action.payload.data.total
            })
            .addCase(SingleCustomer.fulfilled, (state: CustomerState, action: PayloadAction<SingleCustomerResponse>) => {
                state.form.data = action.payload.data.customer
            });

        const handleSubmitPending = (state: CustomerState) => { state.submit_status = 'loading'; };
        const handleSubmitFulfilled = (state: CustomerState) => { state.submit_status = 'completed'; };
        const handleSubmitRejected = (state: CustomerState) => { state.submit_status = 'idle'; };
        builder
            .addCase(UpsertCustomerPost.pending, handleSubmitPending)
            .addCase(UpsertCustomerPost.fulfilled, handleSubmitFulfilled)
            .addCase(UpsertCustomerPost.rejected, handleSubmitRejected);

    }
})

export const {
    setCustomerFormField,
    setCustomerFormErrors,
    setCustomerFormLoading,
    setCustomerFormServerError,
    resetCustomerForm,
} = customerSlice.actions;

export default customerSlice.reducer