import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { API_URL } from "../../../infrastructure/api/Urls"
import type { AuditData, AuditForm } from "../../../core/interfaces/Audit"
import { container } from "../../../di/container"
import { AuditService } from "../../services/AuditService"
import { TOKENS } from "../../../di/tokens"
import type { LeadActivityResponse } from "../../../infrastructure/dtos/AuditResponse"

interface AuditState {
    status: "idle" | "loading" | "ready" | "rejected"
    audits: AuditData[]
    current_page: number
    last_page: number
    total: number
}

const initialState: AuditState = {
    status: "idle",
    audits: [],
    current_page: 1,
    last_page: 1,
    total: 1,
}

export const getAudits = createAsyncThunk(
    API_URL.audit.fetch,
    async (data: AuditForm) => {
        const audit = container.resolve<AuditService>(TOKENS.AuditService)
        return await audit.getAudits(data)
    }
)

const auditSlice = createSlice({
    name: 'audit',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getAudits.pending, state => {
                state.status = 'loading'
            })
            .addCase(getAudits.fulfilled, (state: AuditState, action: PayloadAction<LeadActivityResponse>) => {
                state.audits = action.payload.data.data
                state.status = 'ready'
                state.current_page = action.payload.data.current_page
                state.last_page = action.payload.data.last_page
                state.total = action.payload.data.total
            })
    }
})

export default auditSlice.reducer