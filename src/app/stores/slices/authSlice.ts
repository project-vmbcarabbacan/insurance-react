import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'

import axios from 'axios';
import { TOKENS } from '../../../di/tokens';
import { container } from '../../../di/container';
import type { LoginFailedError } from '../../errors/LoginFailedError';
import type { LoginUseCase } from '../../usecases/auths/LoginUseCase';
import type { LogoutUseCase } from '../../usecases/auths/LogoutUseCase';
import type { CsrfUseCase } from '../../usecases/auths/CsrfUseCase.ts';
import { API_URL } from '../../../infrastructure/api/Urls.ts';
import type { Login } from '../../../core/interfaces/Auth.ts';

interface AuthState {
  has_token: boolean
  is_loading: boolean
  is_rendered: boolean
  error: string
}

const initialState: AuthState = {
  has_token: false,
  is_loading: false,
  is_rendered: false,
  error: ''
}


export const loginWithSession = createAsyncThunk(
  API_URL.auth.login,
  async (credential: Login, { rejectWithValue }) => {
    try {
      const loginUseCase = container.resolve<LoginUseCase>(TOKENS.LoginUseCase);
      const user = await loginUseCase.execute(credential);
      return user.toJSON();
    } catch (err: unknown) {
      if (axios.isAxiosError<LoginFailedError>(err)) {
        return rejectWithValue(err.message || 'Login failed');
      }
      return rejectWithValue(err?.message);
    }
  }
);

export const logout = createAsyncThunk(API_URL.auth.logout,
  async () => {
    const logoutUseCase = container.resolve<LogoutUseCase>(TOKENS.LogoutUseCase)

    await logoutUseCase.execute()
  }
)

export const csrf = createAsyncThunk(API_URL.csrf,
  async () => {
    const csrfUseCase = container.resolve<CsrfUseCase>(TOKENS.CsrfUseCase)

    await csrfUseCase.execute()
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      /* login */
      .addCase(loginWithSession.pending, state => {
        state.error = ''
        state.is_loading = true
      })
      .addCase(loginWithSession.fulfilled, state => {
        state.error = ''
        state.is_loading = false
      })
      .addCase(loginWithSession.rejected, (state, action) => {
        state.error = (action.payload as string) || 'Login failed'
        state.is_loading = false
      })


      /* logout */
      .addCase(logout.fulfilled, state => {
        state.is_loading = false

      })

      /* csrf */
      .addCase(csrf.fulfilled, state => {
        state.has_token = true
      })
  }
})

export default authSlice.reducer
