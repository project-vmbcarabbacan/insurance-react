import type { RootState } from "../store";

export const selectUser = (state: RootState) => state.user.user

export const selectCurrentStatus = (state: RootState) => state.user.status

export const selectIsAuthenticated = (state: RootState) => Boolean(state.user.user)

export const selectAuthLoading = (state: RootState) => state.auth.is_loading

export const selectLoginError = (state: RootState) => state.auth.error