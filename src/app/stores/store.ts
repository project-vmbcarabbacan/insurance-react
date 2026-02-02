import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import userReducer from './slices/userSlice'
import teamReducer from './slices/teamSlice'
import settingReducer from './slices/settingSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    team: teamReducer,
    setting: settingReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch