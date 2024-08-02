import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface AuthState {
  userInfo: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  userInfo: null,
  loading: false,
  error: null,
};

interface AuthCredentials {
  email: string;
  password: string;
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.userInfo = action.payload;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    signupStart(state) {
      state.loading = true;
      state.error = null;
    },
    signupSuccess(state, action: PayloadAction<any>) {
      state.loading = false;
      state.userInfo = action.payload;
    },
    signupFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.userInfo = null;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  signupStart,
  signupSuccess,
  signupFailure,
  logout,
} = authSlice.actions;

export const login = (credentials: AuthCredentials) => async (dispatch: any) => {
  dispatch(loginStart());
  try {
    const response = await axios.post('/api/login', credentials);
    dispatch(loginSuccess(response.data));
  } catch (error: any) {
    dispatch(loginFailure(error.message));
  }
};

export const signup = (credentials: AuthCredentials) => async (dispatch: any) => {
  dispatch(signupStart());
  try {
    const response = await axios.post('/api/signup', credentials);
    dispatch(signupSuccess(response.data));
  } catch (error: any) {
    dispatch(signupFailure(error.message));
  }
};

export const logoutAction = () => async (dispatch: any) => {
  try {
    await axios.post('/api/logout');
    dispatch(logout());
  } catch (error: any) {
    console.error(error.message);
  }
};

export default authSlice.reducer;
