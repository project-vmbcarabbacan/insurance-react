import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import userReducer from './slices/userSlice'
import teamReducer from './slices/teamSlice'
import settingReducer from './slices/settingSlice'
import customerReducer from './slices/customerSlice'
import leadVehicleReducer from './slices/vehicleSlice'
import leadHealthReducer from './slices/healthSlice'
import leadReducer from './slices/leadSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    team: teamReducer,
    setting: settingReducer,
    customer: customerReducer,
    lead: leadReducer,
    lead_vehicle: leadVehicleReducer,
    lead_health: leadHealthReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch