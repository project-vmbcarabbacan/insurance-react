import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { LeadActivity, LeadDetail } from '../../../core/interfaces/Lead'
import { CustomerDetail } from './customerSlice'
import type { CustomerDetailsResponse } from '../../../infrastructure/dtos/CustomerResponse'
import type { LeadResponse } from '../../../core/interfaces/LeadViewResponse'
import type { ViewSection } from '../../../core/interfaces/LeadViewConfig'
import type { LeadsMessageResponse, LeadViewResponse } from '../../../infrastructure/dtos/LeadResponse'
import { ViewVehicleLeadProduct } from './vehicleSlice'
import { ViewHealthLeadProduct } from './healthSlice'
import type { LeadActivityUseCase } from '../../usecases/leads/LeadActivityUseCase'
import { container } from '../../../di/container'
import { TOKENS } from '../../../di/tokens'
import { API_URL } from '../../../infrastructure/api/Urls'
import type { LeadsUseCase } from '../../usecases/leads/LeadsUseCase'

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

export const AddLeadActivity = createAsyncThunk(
    API_URL.lead.activity,
    async (data: LeadActivity) => {
        const lead = container.resolve<LeadActivityUseCase>(TOKENS.LeadActivityUseCase)
        return lead.execute(data)
    }
)

export const GetLeads = createAsyncThunk(
    API_URL.lead.leads,
    async (customer_uuid: string) => {
        const lead = container.resolve<LeadsUseCase>(TOKENS.LeadsUseCase)
        return lead.execute(customer_uuid)
    }
)

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
            .addCase(GetLeads.fulfilled, (state: LeadState, action: PayloadAction<LeadsMessageResponse>) => {
                state.leads = action.payload.data.leads
            })
    }
})

export default leadSlice.reducer