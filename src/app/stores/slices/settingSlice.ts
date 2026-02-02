import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { SlugName } from '../../../core/interfaces/SlugName'
import { API_URL } from '../../../infrastructure/api/Urls'
import { ManageTeamUseCase } from '../../usecases/settings/ManageTeamUseCase'
import { TOKENS } from '../../../di/tokens'
import { container } from '../../../di/container'
import type { SettingInsuranceProductResponse, SettingManageTeamResponse } from '../../../infrastructure/dtos/SettingResponse'
import type { LabelValue } from '../../../core/interfaces/LabelValue'
import type { InsuranceProductUseCase } from '../../usecases/settings/InsuranceProductUseCase'

interface SettingState {
    roles: SlugName[]
    statuses: LabelValue[]
    insuranceProducts: LabelValue[]
}

const initialState: SettingState = {
    roles: [],
    statuses: [],
    insuranceProducts: [],
}

export const SettingManageTeam = createAsyncThunk(
    API_URL.setting.manageTeams,
    async () => {
        const setting = container.resolve<ManageTeamUseCase>(TOKENS.SettingManageTeam)
        return setting.execute()
    }
)

export const InsuranceProduct = createAsyncThunk(
    API_URL.setting.insuranceProduct,
    async () => {
        const setting = container.resolve<InsuranceProductUseCase>(TOKENS.InsuranceProductUseCase)
        return setting.execute()
    }
)

const settingSlice = createSlice({
    name: 'setting',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(SettingManageTeam.fulfilled, (state: SettingState, action: PayloadAction<SettingManageTeamResponse>) => {
                state.roles = action.payload.data.roles
                state.statuses = action.payload.data.statuses
            })
            .addCase(InsuranceProduct.fulfilled, (state: SettingState, action: PayloadAction<SettingInsuranceProductResponse>) => {
                state.insuranceProducts = action.payload.data.products
            })
    }
})

export default settingSlice.reducer