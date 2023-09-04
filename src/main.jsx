import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ThemeContextProvider } from './context/ThemeContext';
import AuthContextProvider from './context/AuthContext';
import Router from './router/Router';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <ThemeContextProvider>
      <Router />
    </ThemeContextProvider>
  </AuthContextProvider>
)