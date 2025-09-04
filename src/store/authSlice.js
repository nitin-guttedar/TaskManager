import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loginApi, signupApi } from '../api/authApi';

export const login = createAsyncThunk(
  'auth/login',
  async (payload, { rejectWithValue }) => {
    try {
      const data = await loginApi(payload);
      return { token: data.token, email: payload.email };
    } catch (e) {
      return rejectWithValue(e?.response?.data || { error: 'Login failed' });
    }
  },
);

export const signup = createAsyncThunk(
  'auth/signup',
  async (payload, { rejectWithValue }) => {
    try {
      const data = await signupApi(payload);
      return { token: data.token, email: payload.email, userId: data.id };
    } catch (e) {
      return rejectWithValue(e?.response?.data || { error: 'Signup failed' });
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    email: null,
    userId: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout(state) {
      state.token = null;
      state.email = null;
      state.userId = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(login.pending, s => {
        s.loading = true;
        s.error = null;
      })
      .addCase(login.fulfilled, (s, a) => {
        s.loading = false;
        s.error = null;
        s.token = a.payload.token;
        s.email = a.payload.email;
      })
      .addCase(login.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload?.error || 'Login failed';
      })
      .addCase(signup.pending, s => {
        s.loading = true;
        s.error = null;
      })
      .addCase(signup.fulfilled, (s, a) => {
        s.loading = false;
        s.error = null;
        s.token = a.payload.token;
        s.email = a.payload.email;
        s.userId = a.payload.userId;
      })
      .addCase(signup.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload?.error || 'Signup failed';
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
