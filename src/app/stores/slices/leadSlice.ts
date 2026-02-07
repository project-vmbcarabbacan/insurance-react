import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { LeadDetail } from '../../../core/interfaces/Lead'
import { CustomerDetail } from './customerSlice'
import type { CustomerDetailsResponse } from '../../../infrastructure/dtos/CustomerResponse'

interface LeadState {
    status: 'idle' | 'loading' | 'ready' | 'rejected',
    leads: LeadDetail[]
}

const initialState: LeadState = {
    status: 'idle',
    leads: []
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
    }
})

export default leadSlice.reducer