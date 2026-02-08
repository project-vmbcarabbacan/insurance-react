import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { API_URL } from '../../../infrastructure/api/Urls'
import { container } from '../../../di/container'
import { TOKENS } from '../../../di/tokens'
import type { LeadHealthForm } from '../../../core/interfaces/LeadHealth'
import type { UpsertHealthLeadProductUseCase } from '../../usecases/leads/healths/UpsertHealthLeadProductUseCase'
import type { ViewHealthLeadProductUseCase } from '../../usecases/leads/healths/ViewHealthLeadProductUseCase'

interface HealthState {
    status: 'idle' | 'loading' | 'ready' | 'rejected',
}

const initialState: HealthState = {
    status: 'idle',
}

export const upsertHealthLeadProduct = createAsyncThunk(
    API_URL.lead.health.store,
    async (data: LeadHealthForm) => {
        const upsertHealthLead = container.resolve<UpsertHealthLeadProductUseCase>(TOKENS.UpsertHealthLeadProductUseCase)
        return await upsertHealthLead.execute(data);
    }
)

export const ViewHealthLeadProduct = createAsyncThunk(
    API_URL.lead.health.view,
    async (uuid: string) => {
        const viewLeadProduct = container.resolve<ViewHealthLeadProductUseCase>(TOKENS.ViewHealthLeadProductUseCase)
        return await viewLeadProduct.execute(uuid);
    }
)

const leadHealthSlice = createSlice({
    name: 'lead_health',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            /* current health */
            .addCase(upsertHealthLeadProduct.pending, state => {
                state.status = 'loading'
            })
            .addCase(upsertHealthLeadProduct.fulfilled, state => {
                state.status = 'ready'
            })
            .addCase(upsertHealthLeadProduct.rejected, state => {
                state.status = 'rejected'
            })
    }
})

export default leadHealthSlice.reducer