import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { SlugName } from '../../../core/interfaces/SlugName'
import { API_URL } from '../../../infrastructure/api/Urls'
import { ManageTeamUseCase } from '../../usecases/settings/ManageTeamUseCase'
import { TOKENS } from '../../../di/tokens'
import { container } from '../../../di/container'
import type { SettingInsuranceProductResponse, SettingManageCustomerResponse, SettingManageTeamResponse, SettingUpsertCustomerResponse } from '../../../infrastructure/dtos/SettingResponse'
import type { LabelValue } from '../../../core/interfaces/LabelValue'
import type { InsuranceProductUseCase } from '../../usecases/settings/InsuranceProductUseCase'
import type { ManageCustomerUseCase } from '../../usecases/settings/ManageCustomerUseCase'
import type { ManageUpsertCustomerUseCase } from '../../usecases/settings/ManageUpsertCustomerUseCase'

interface SettingState {
    roles: SlugName[]
    statuses: LabelValue[]
    types: LabelValue[]
    country_codes: LabelValue[]
    insurance_products: LabelValue[]
    customer_sources: LabelValue[]
    genders: LabelValue[]
}

const initialState: SettingState = {
    roles: [],
    statuses: [],
    types: [],
    country_codes: [],
    insurance_products: [],
    customer_sources: [],
    genders: [],
}

export const SettingManageTeam = createAsyncThunk(
    API_URL.setting.manageTeams,
    async () => {
        const setting = container.resolve<ManageTeamUseCase>(TOKENS.SettingManageTeam)
        return setting.execute()
    }
)

export const ManageCustomer = createAsyncThunk(
    API_URL.setting.manageCustomers,
    async () => {
        const setting = container.resolve<ManageCustomerUseCase>(TOKENS.ManageCustomerUseCase)
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

export const SettingUpsertCustomer = createAsyncThunk(
    API_URL.setting.upsertCustomer,
    async () => {
        const setting = container.resolve<ManageUpsertCustomerUseCase>(TOKENS.ManageUpsertCustomerUseCase)
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
            .addCase(ManageCustomer.fulfilled, (state: SettingState, action: PayloadAction<SettingManageCustomerResponse>) => {
                state.types = action.payload.data.types
                state.insurance_products = action.payload.data.products
                state.statuses = action.payload.data.statuses
            })
            .addCase(InsuranceProduct.fulfilled, (state: SettingState, action: PayloadAction<SettingInsuranceProductResponse>) => {
                state.insurance_products = action.payload.data.products
            })
            .addCase(SettingUpsertCustomer.fulfilled, (state: SettingState, action: PayloadAction<SettingUpsertCustomerResponse>) => {
                state.types = action.payload.data.types
                state.statuses = action.payload.data.statuses
                state.customer_sources = action.payload.data.customer_sources
                state.genders = action.payload.data.genders
                state.country_codes = action.payload.data.country_codes
            })
    }
})

export default settingSlice.reducer