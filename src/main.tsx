import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Provider } from 'react-redux';
import store, { login } from './store/store.ts';
import { setAuthenticateHeader } from './utils/authenticate.ts';
import { Toaster } from './components/ui/toaster.tsx';

const token = localStorage.getItem('token') || sessionStorage.getItem('token');
setAuthenticateHeader(token);

if (token) {
  store.dispatch(login());
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <Toaster />
    </Provider>
  </React.StrictMode>,
);
