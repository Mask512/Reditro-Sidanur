import store, { logout } from '@/store/store';
import axios from 'axios';

export const setAuthenticateHeader = (token: string | null) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export const clearAuth = () => {
  setAuthenticateHeader(null);
  localStorage.clear();
  sessionStorage.clear();
  store.dispatch(logout());
};
