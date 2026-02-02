import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { SlugName } from '../../../core/interfaces/SlugName'
import { API_URL } from '../../../infrastructure/api/Urls'
import { ManageTeamUseCase } from '../../usecases/settings/ManageTeamUseCase'
import { TOKENS } from '../../../di/tokens'
import { container } from '../../../di/container'
import type { SettingManageTeamResponse } from '../../../infrastructure/dtos/SettingResponse'
import type { LabelValue } from '../../../core/interfaces/LabelValue'

interface SettingState {
    roles: SlugName[]
    statuses: LabelValue[]
}

const initialState: SettingState = {
    roles: [],
    statuses: []
}

export const SettingManageTeam = createAsyncThunk(
    API_URL.setting.manageTeams,
    async () => {
        const setting = container.resolve<ManageTeamUseCase>(TOKENS.SettingManageTeam)
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
    }
})

export default settingSlice.reducer