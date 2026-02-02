import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { API_URL } from '../../../infrastructure/api/Urls'
import { container } from '../../../di/container'
import { TeamUseCase } from '../../usecases/users/TeamUseCase.ts'
import { TOKENS } from '../../../di/tokens.ts'
import type { AddTeam, AssignProduct, Team, TeamFilter, TeamPassword, TeamStatus } from '../../../core/interfaces/Team'
import type { TeamAccessedResponse, TeamResponse } from '../../../infrastructure/dtos/TeamResponse.ts'
import type { UpsertTeamUseCase } from '../../usecases/users/UpsertTeamUseCase.ts'
import { AddTeamError } from '../../errors/AddTeamError.ts'
import type { UpdateTeamStatusUseCase } from '../../usecases/users/UpdateTeamStatusUseCase.ts'
import { TeamStatusError } from '../../errors/TeamStatusError.ts'
import type { UpdateTeamPasswordUseCase } from '../../usecases/users/UpdateTeamPasswordUseCase.ts'
import { TeamPasswordError } from '../../errors/TeamPasswordError.ts'
import { TeamAccessedUseCase } from '../../usecases/users/TeamAccessedUseCase.ts'
import type { UpsertTeamProductAccessedUseCase } from '../../usecases/users/UpsertTeamProductAccessedUseCase.ts'
import { UpsertTeamAssignProductError } from '../../errors/UpsertTeamAssignProductError.ts'

interface TeamFormState {
    data: AddTeam;
    password: TeamPassword;
    insuranceProducts: AssignProduct
    errors: Partial<Record<keyof AddTeam, string>>;
    isLoading: boolean;
    serverError: string | null;
}

interface TeamState {
    status: 'idle' | 'loading' | 'ready'
    teams: Team[]
    current_page: number
    last_page: number
    total: number
    submit_status: 'idle' | 'loading' | 'completed'
    form: TeamFormState
}



const emptyFormData: AddTeam = {
    name: '',
    email: '',
    role_slug: '',
    password: '',
};

const emptyPassword: TeamPassword = {
    uuid: '',
    password: '',
}

const emptyProducts: AssignProduct = {
    uuid: '',
    accessed: {
        vehicle: false,
        health: false,
        travel: false,
        pet: false,
        home: false
    },
};

const initialState: TeamState = {
    status: 'idle',
    teams: [],
    current_page: 1,
    last_page: 1,
    total: 1,
    submit_status: 'idle',
    form: {
        data: emptyFormData,
        password: emptyPassword,
        insuranceProducts: emptyProducts,
        errors: {},
        isLoading: false,
        serverError: null,
    },
}


export const TeamPagination = createAsyncThunk(
    `${API_URL.user.teams}-get`,
    async (data: TeamFilter, { rejectWithValue }) => {
        try {
            const teamUseCase = container.resolve<TeamUseCase>(TOKENS.TeamUseCase)
            return await teamUseCase.execute(data)
        } catch (error: unknown) {
            return rejectWithValue('Unexpected api error');
        }
    }
)

export const TeamAccessed = createAsyncThunk(
    `${API_URL.user.accessed}-get`,
    async (uuid: string, { rejectWithValue }) => {
        try {
            const accessed = container.resolve<TeamAccessedUseCase>(TOKENS.TeamAccessedUseCase)
            return await accessed.execute(uuid);
        } catch (error) {
            return rejectWithValue('Unexpected api error');
        }
    }
)

export const UpsertMemberPost = createAsyncThunk(
    `${API_URL.user.teams}-post-patch`,
    async (data: AddTeam, { rejectWithValue }) => {
        try {
            const upsert = container.resolve<UpsertTeamUseCase>(TOKENS.UpsertTeamUseCase)
            return await upsert.execute(data)
        } catch (error: unknown) {
            if (error instanceof AddTeamError) {
                return rejectWithValue(error.message || 'Something went wrong')
            }

            return rejectWithValue(error?.message);
        }
    }
)

export const UpdateTeamStatus = createAsyncThunk(
    `${API_URL.user.teamStatus}-patch`,
    async (data: TeamStatus, { rejectWithValue }) => {
        try {
            const upsert = container.resolve<UpdateTeamStatusUseCase>(TOKENS.UpdateTeamStatusUseCase)
            return await upsert.execute(data)
        } catch (error: unknown) {
            if (error instanceof TeamStatusError) {
                return rejectWithValue(error.message || 'Something went wrong')
            }

            return rejectWithValue(error?.message);
        }
    }
)

export const UpsertTeamProductAccessed = createAsyncThunk(
    `${API_URL.user.assignAccessed}-patch`,
    async (data: AssignProduct, { rejectWithValue }) => {
        try {
            const upsert = container.resolve<UpsertTeamProductAccessedUseCase>(TOKENS.UpsertTeamProductAccessedUseCase)
            return await upsert.execute(data)
        } catch (error: unknown) {
            if (error instanceof UpsertTeamAssignProductError) {
                return rejectWithValue(error.message || 'Something went wrong')
            }

            return rejectWithValue(error?.message);
        }
    }
)

export const UpdateTeamPassword = createAsyncThunk(
    `${API_URL.user.password}-patch`,
    async (data: TeamPassword, { rejectWithValue }) => {
        try {
            const upsert = container.resolve<UpdateTeamPasswordUseCase>(TOKENS.UpdateTeamPasswordUseCase)
            return await upsert.execute(data)
        } catch (error: unknown) {
            if (error instanceof TeamPasswordError) {
                return rejectWithValue(error.message || 'Something went wrong')
            }

            return rejectWithValue(error?.message);
        }
    }
)

const teamSlice = createSlice({
    name: 'team',
    initialState,
    reducers: {
        setTeamFormField(
            state,
            action: PayloadAction<{ field: keyof AddTeam; value: string }>
        ) {
            state.form.data[action.payload.field] = action.payload.value;
            delete state.form.errors[action.payload.field];
        },

        setTeamFormPasswordField(
            state,
            action: PayloadAction<{ field: keyof TeamPassword; value: string }>
        ) {
            state.form.password[action.payload.field] = action.payload.value;
            delete state.form.errors[action.payload.field];
        },

        setTeamFormErrors(
            state,
            action: PayloadAction<TeamState['form']['errors']>
        ) {
            state.form.errors = action.payload;
        },

        setTeamFormLoading(state, action: PayloadAction<boolean>) {
            state.form.isLoading = action.payload;
        },

        setTeamFormServerError(state, action: PayloadAction<string | null>) {
            state.form.serverError = action.payload;
        },

        toggleInsuranceProductSwitch: (state, action: PayloadAction<string>) => {
            const productValue = action.payload;
            state.form.insuranceProducts.accessed[productValue] = !state.form.insuranceProducts.accessed[productValue];
        },

        toggInsuranceProductUuid: (state, action: PayloadAction<string>) => {
            state.form.insuranceProducts.uuid = action.payload;
        },

        resetTeamForm(state) {
            state.form = {
                data: emptyFormData,
                password: emptyPassword,
                insuranceProducts: emptyProducts,
                errors: {},
                isLoading: false,
                serverError: null,
            };
        },
    },
    extraReducers: builder => {
        builder
            .addCase(TeamPagination.pending, state => {
                state.status = 'loading'
            })
            .addCase(TeamPagination.fulfilled, (state: TeamState, action: PayloadAction<TeamResponse>) => {
                state.teams = action.payload.data.data.map(team => ({
                    uuid: team.uuid,
                    name: team.name,
                    email: team.email,
                    status: team.status,
                    role_name: team.role_name,
                }))

                state.status = 'ready'
                state.current_page = action.payload.data.current_page
                state.last_page = action.payload.data.last_page
                state.total = action.payload.data.total
            })
            .addCase(TeamAccessed.fulfilled, (state: TeamState, action: PayloadAction<TeamAccessedResponse>) => {
                state.form.insuranceProducts.accessed = action.payload.data.accessed
            });

        const handleSubmitPending = (state: TeamState) => { state.submit_status = 'loading'; };
        const handleSubmitFulfilled = (state: TeamState) => { state.submit_status = 'completed'; };
        const handleSubmitRejected = (state: TeamState) => { state.submit_status = 'idle'; };

        builder
            .addCase(UpsertMemberPost.pending, handleSubmitPending)
            .addCase(UpsertMemberPost.fulfilled, handleSubmitFulfilled)
            .addCase(UpsertMemberPost.rejected, handleSubmitRejected)
            .addCase(UpdateTeamStatus.pending, handleSubmitPending)
            .addCase(UpdateTeamStatus.fulfilled, handleSubmitFulfilled)
            .addCase(UpdateTeamStatus.rejected, handleSubmitRejected)
            .addCase(UpdateTeamPassword.pending, handleSubmitPending)
            .addCase(UpdateTeamPassword.fulfilled, handleSubmitFulfilled)
            .addCase(UpdateTeamPassword.rejected, handleSubmitRejected)
            .addCase(UpsertTeamProductAccessed.pending, handleSubmitPending)
            .addCase(UpsertTeamProductAccessed.fulfilled, handleSubmitFulfilled)
            .addCase(UpsertTeamProductAccessed.rejected, handleSubmitRejected);
    }
})

export const {
    setTeamFormField,
    setTeamFormPasswordField,
    toggleInsuranceProductSwitch,
    toggInsuranceProductUuid,
    setTeamFormErrors,
    setTeamFormLoading,
    setTeamFormServerError,
    resetTeamForm,
} = teamSlice.actions;

export default teamSlice.reducer