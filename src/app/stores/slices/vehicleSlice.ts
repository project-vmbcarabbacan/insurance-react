import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { API_URL } from '../../../infrastructure/api/Urls'
import { container } from '../../../di/container'
import { TOKENS } from '../../../di/tokens'
import type { UpsertVehicleLeadProductUseCase } from '../../usecases/leads/vehicles/UpsertVehicleLeadProductUseCase'
import type { VehicleInsuranceForm } from '../../../core/interfaces/LeadVehicle'

interface UserState {
    status: 'idle' | 'loading' | 'ready' | 'rejected',
}

const initialState: UserState = {
    status: 'idle',
}

export const upsertVehicleLeadProduct = createAsyncThunk(
    API_URL.lead.vehicle.store,
    async (data: VehicleInsuranceForm) => {
        const upsertVehicleLeadProduct = container.resolve<UpsertVehicleLeadProductUseCase>(TOKENS.UpsertVehicleLeadProductUseCase)
        return await upsertVehicleLeadProduct.execute(data);
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