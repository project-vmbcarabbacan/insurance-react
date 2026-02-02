import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { User } from '../../../domain/entities/User'
import { API_URL } from '../../../infrastructure/api/Urls'
import { container } from '../../../di/container'
import { CurrentUseCase } from '../../usecases/users/CurrentUseCase'
import { TOKENS } from '../../../di/tokens'
import { loginWithSession, logout } from './authSlice'

interface UserState {
    status: 'idle' | 'loading' | 'ready' | 'rejected',
    user: ReturnType<User['toJSON']> | null
}

const initialState: UserState = {
    status: 'idle',
    user: null
}

export const currentUser = createAsyncThunk(
    API_URL.user.current,
    async () => {
        const currentUseCase = container.resolve<CurrentUseCase>(TOKENS.CurrentUseCase)

        const user = await currentUseCase.execute();
        return user.toJSON()
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            /* current user */
            .addCase(currentUser.pending, state => {
                state.status = 'loading'
            })
            .addCase(currentUser.fulfilled, (state: UserState, actions: PayloadAction<ReturnType<User['toJSON']>>) => {
                state.status = 'ready'
                state.user = actions.payload
            })
            .addCase(loginWithSession.fulfilled, (state, action: PayloadAction<ReturnType<User['toJSON']>>) => {
                state.user = action.payload
            })
            .addCase(currentUser.rejected, state => {
                state.status = 'rejected'
                state.user = null
            })
            .addCase(logout.fulfilled, state => {
                state.user = null
            })
    }
})

export default userSlice.reducer