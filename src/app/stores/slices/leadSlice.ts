import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { LeadActivity, LeadDetail, LeadFilter } from '../../../core/interfaces/Lead'
import { CustomerDetail } from './customerSlice'
import type { CustomerDetailsResponse } from '../../../infrastructure/dtos/CustomerResponse'
import type { LeadResponse } from '../../../core/interfaces/LeadViewResponse'
import type { ViewSection } from '../../../core/interfaces/LeadViewConfig'
import type { ActivityObject, LeadsMessageResponse, LeadViewResponse, ViewLeadActivityResponse } from '../../../infrastructure/dtos/LeadResponse'
import { ViewVehicleLeadProduct } from './vehicleSlice'
import { ViewHealthLeadProduct } from './healthSlice'
import type { LeadActivityUseCase } from '../../usecases/leads/LeadActivityUseCase'
import { container } from '../../../di/container'
import { TOKENS } from '../../../di/tokens'
import { API_URL } from '../../../infrastructure/api/Urls'
import type { LeadsUseCase } from '../../usecases/leads/LeadsUseCase'
import type { LeadService } from '../../services/LeadService'

interface LeadState {
    status: 'idle' | 'loading' | 'ready' | 'rejected',
    leads: LeadDetail[],
    current_page: number
    last_page: number
    total: number
    lead: LeadResponse,
    view: ViewSection[]
    lead_activities: ActivityObject[]

}

const initialState: LeadState = {
    status: 'idle',
    leads: [],
    current_page: 1,
    last_page: 1,
    total: 1,
    lead: {} as LeadResponse,
    view: [],
    lead_activities: []
}

export const AddLeadActivity = createAsyncThunk(
    API_URL.lead.activity.add,
    async (data: LeadActivity) => {
        const lead = container.resolve<LeadActivityUseCase>(TOKENS.LeadActivityUseCase)
        return lead.execute(data)
    }
)

export const GetLeads = createAsyncThunk(
    API_URL.lead.leads,
    async (data: LeadFilter) => {
        const lead = container.resolve<LeadsUseCase>(TOKENS.LeadsUseCase)
        return lead.execute(data)
    }
)

export const GetLeadActivity = createAsyncThunk(
    API_URL.lead.activity.get,
    async (lead_uuid: string) => {
        const lead = container.resolve<LeadService>(TOKENS.LeadService)
        return lead.getLeadACtivity(lead_uuid)
    }
)

const leadSlice = createSlice({
    name: 'lead',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(CustomerDetail.fulfilled, (state: LeadState, action: PayloadAction<CustomerDetailsResponse>) => {
                state.leads = action.payload.data.leads.data
                state.current_page = action.payload.data.leads.current_page
                state.last_page = action.payload.data.leads.last_page
                state.total = action.payload.data.leads.total
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
                state.leads = action.payload.data.leads.data
                state.current_page = action.payload.data.leads.current_page
                state.last_page = action.payload.data.leads.last_page
                state.total = action.payload.data.leads.total
            })
            .addCase(GetLeadActivity.fulfilled, (state: LeadState, action: PayloadAction<ViewLeadActivityResponse>) => {
                state.lead_activities = action.payload.data.activities
            })
    }
})

export default leadSlice.reducer