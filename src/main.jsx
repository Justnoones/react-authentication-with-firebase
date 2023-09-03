import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { router } from './router/router';
import { RouterProvider } from 'react-router-dom';
import { ThemeContextProvider } from './context/ThemeContext';
import AuthContextProvider from './context/AuthContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <ThemeContextProvider>
      <RouterProvider router={router} />
    </ThemeContextProvider>
  </AuthContextProvider>
)