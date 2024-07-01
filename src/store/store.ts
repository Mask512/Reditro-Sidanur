import { configureStore, createSlice } from '@reduxjs/toolkit';

interface AuthState {
  isLoggedIn: boolean;
  isAdmin: boolean;
}

const initialState: AuthState = {
  isLoggedIn: false,
  isAdmin: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
    },
    adminLogin: (state) => {
      state.isAdmin = true;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.isAdmin = false;
    },
  },
});

export const { login, adminLogin, logout } = authSlice.actions;

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
