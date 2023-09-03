import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { router } from './router/router';
import { RouterProvider } from 'react-router-dom';
import { ThemeContextProvider } from './context/ThemeContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeContextProvider>
    <RouterProvider router={router} />
  </ThemeContextProvider>
)