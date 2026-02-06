import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { SlugName } from '../../../core/interfaces/SlugName'
import { API_URL } from '../../../infrastructure/api/Urls'
import { ManageTeamUseCase } from '../../usecases/settings/ManageTeamUseCase'
import { TOKENS } from '../../../di/tokens'
import { container } from '../../../di/container'
import type { SettingInsuranceProductResponse, SettingLeadVehiclePrerequisitesResponse, SettingManageCustomerResponse, SettingManageTeamResponse, SettingUpsertCustomerResponse, SettingVehiclePrerequisitesResponse } from '../../../infrastructure/dtos/SettingResponse'
import type { LabelValue } from '../../../core/interfaces/LabelValue'
import type { InsuranceProductUseCase } from '../../usecases/settings/InsuranceProductUseCase'
import type { ManageCustomerUseCase } from '../../usecases/settings/ManageCustomerUseCase'
import type { ManageUpsertCustomerUseCase } from '../../usecases/settings/ManageUpsertCustomerUseCase'
import type { keyBoolean } from '../../../infrastructure/dtos/TeamResponse'
import type { VehiclePrerequisiteService } from '../../services/VehiclePrerequisiteService'

interface SettingState {
    roles: SlugName[]
    statuses: LabelValue[]
    types: LabelValue[]
    country_codes: LabelValue[]
    insurance_products: LabelValue[]
    customer_sources: LabelValue[]
    genders: LabelValue[]
    accessed: keyBoolean
    years: LabelValue[]
    makes: LabelValue[]
    models: LabelValue[]
    trims: LabelValue[]
    claim_histories: LabelValue[]
    policy_types: LabelValue[]
    specification_types: LabelValue[]
    emirates: LabelValue[]
    countries: LabelValue[]
    yes_no: LabelValue[]
}

const initialState: SettingState = {
    roles: [],
    statuses: [],
    types: [],
    country_codes: [],
    insurance_products: [],
    customer_sources: [],
    genders: [],
    accessed: {},
    years: [],
    makes: [],
    models: [],
    trims: [],
    claim_histories: [],
    policy_types: [],
    specification_types: [],
    emirates: [],
    countries: [],
    yes_no: [],
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

export const SettingVehiclePrerequisites = createAsyncThunk(
    API_URL.setting.vehicle.prerequisites,
    async () => {
        const setting = container.resolve<VehiclePrerequisiteService>(TOKENS.VehiclePrerequisiteService)
        return setting.getVehiclePrerequisites()
    }
)

export const SettingVehicleMakes = createAsyncThunk(
    API_URL.setting.vehicle.make,
    async (data: { year: number }) => {
        const setting = container.resolve<VehiclePrerequisiteService>(TOKENS.VehiclePrerequisiteService)
        return setting.getVehicleMakes(data.year)
    }
)

export const SettingVehicleModels = createAsyncThunk(
    API_URL.setting.vehicle.model,
    async (data: { year: number, make_id: number }) => {
        const setting = container.resolve<VehiclePrerequisiteService>(TOKENS.VehiclePrerequisiteService)
        return setting.getVehicleModels(data.year, data.make_id)
    }
)

export const SettingVehicleTrims = createAsyncThunk(
    API_URL.setting.vehicle.trim,
    async (data: { year: number, make_id: number, model_id: number }) => {
        const setting = container.resolve<VehiclePrerequisiteService>(TOKENS.VehiclePrerequisiteService)
        return setting.getVehicleTrims(data.year, data.make_id, data.model_id)
    }
)

const settingSlice = createSlice({
    name: 'setting',
    initialState,
    reducers: {
        toggleSettingInsuranceProductSwitch: (state, action: PayloadAction<string>) => {
            const productValue = action.payload;
            state.accessed[productValue] = !state.accessed[productValue];
        },
    },
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
                state.accessed = action.payload.data.accessed
            })
            .addCase(SettingVehiclePrerequisites.fulfilled, (state: SettingState, action: PayloadAction<SettingLeadVehiclePrerequisitesResponse>) => {
                state.years = action.payload.data.years
                state.claim_histories = action.payload.data.claim_histories
                state.policy_types = action.payload.data.policy_types
                state.specification_types = action.payload.data.specification_types
                state.yes_no = action.payload.data.yes_no
                state.countries = action.payload.data.countries
                state.emirates = action.payload.data.emirates
            })
            .addCase(SettingVehicleMakes.fulfilled, (state: SettingState, action: PayloadAction<SettingVehiclePrerequisitesResponse>) => {
                state.makes = action.payload.data
            })
            .addCase(SettingVehicleModels.fulfilled, (state: SettingState, action: PayloadAction<SettingVehiclePrerequisitesResponse>) => {
                state.models = action.payload.data
            })
            .addCase(SettingVehicleTrims.fulfilled, (state: SettingState, action: PayloadAction<SettingVehiclePrerequisitesResponse>) => {
                state.trims = action.payload.data
            })
    }
})

export const {
    toggleSettingInsuranceProductSwitch,
} = settingSlice.actions;

export default settingSlice.reducer