import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { API_URL } from '../../../infrastructure/api/Urls'
import { container } from '../../../di/container'
import { TOKENS } from '../../../di/tokens'
import type { UpsertVehicleLeadProductUseCase } from '../../usecases/leads/vehicles/UpsertVehicleLeadProductUseCase'
import type { LeadVehicleForm } from '../../../core/interfaces/LeadVehicle'
import type { ViewVehicleLeadProductUseCase } from '../../usecases/leads/vehicles/ViewVehicleLeadProductUseCase'
import type { FindVehicleLeadProductUseCase } from '../../usecases/leads/vehicles/FindVehicleLeadProductUseCase'

interface VehicleState {
    status: 'idle' | 'loading' | 'ready' | 'rejected',
}

const initialState: VehicleState = {
    status: 'idle',
}

export const upsertVehicleLeadProduct = createAsyncThunk(
    API_URL.lead.vehicle.store,
    async (data: LeadVehicleForm) => {
        const upsertVehicleLeadProduct = container.resolve<UpsertVehicleLeadProductUseCase>(TOKENS.UpsertVehicleLeadProductUseCase)
        return await upsertVehicleLeadProduct.execute(data);
    }
)

export const ViewVehicleLeadProduct = createAsyncThunk(
    API_URL.lead.vehicle.view,
    async (uuid: string) => {
        const viewLeadProduct = container.resolve<ViewVehicleLeadProductUseCase>(TOKENS.ViewVehicleLeadProductUseCase)
        return await viewLeadProduct.execute(uuid);
    }
)

export const FindVehicleLeadProduct = createAsyncThunk(
    API_URL.lead.vehicle.find,
    async (data: { lead_uuid: string }) => {
        const findLeadProduct = container.resolve<FindVehicleLeadProductUseCase>(TOKENS.FindVehicleLeadProductUseCase)
        return await findLeadProduct.execute(data.lead_uuid);
    }
)

const leadVehicleSlice = createSlice({
    name: 'lead_vehicle',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            /* current user */
            .addCase(upsertVehicleLeadProduct.pending, state => {
                state.status = 'loading'
            })
            .addCase(upsertVehicleLeadProduct.fulfilled, state => {
                state.status = 'ready'
            })
            .addCase(upsertVehicleLeadProduct.rejected, state => {
                state.status = 'rejected'
            })
    }
})

export default leadVehicleSlice.reducer