import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { LeadDetail } from '../../../core/interfaces/Lead'
import { CustomerDetail } from './customerSlice'
import type { CustomerDetailsResponse } from '../../../infrastructure/dtos/CustomerResponse'
import type { LeadResponse } from '../../../core/interfaces/LeadViewResponse'
import type { ViewSection } from '../../../core/interfaces/LeadViewConfig'
import type { LeadViewResponse } from '../../../infrastructure/dtos/LeadResponse'
import { ViewVehicleLeadProduct } from './vehicleSlice'
import { ViewHealthLeadProduct } from './healthSlice'

interface LeadState {
    status: 'idle' | 'loading' | 'ready' | 'rejected',
    leads: LeadDetail[],
    lead: LeadResponse,
    view: ViewSection[]


}

const initialState: LeadState = {
    status: 'idle',
    leads: [],
    lead: {} as LeadResponse,
    view: []
}

const leadSlice = createSlice({
    name: 'lead',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(CustomerDetail.fulfilled, (state: LeadState, action: PayloadAction<CustomerDetailsResponse>) => {
                state.leads = action.payload.data.leads
            })
            .addCase(ViewVehicleLeadProduct.fulfilled, (state: LeadState, action: PayloadAction<LeadViewResponse>) => {
                state.lead = action.payload.data.lead
                state.view = action.payload.data.view
            })
            .addCase(ViewHealthLeadProduct.fulfilled, (state: LeadState, action: PayloadAction<LeadViewResponse>) => {
                state.lead = action.payload.data.lead
                state.view = action.payload.data.view
            })
    }
})

export default leadSlice.reducer