import React from 'react';
import Home from '../pages/Home';
import { createBrowserRouter } from "react-router-dom";
import Layout from '../Layouts/Layout';
import BookDetail from '../components/BookDetail';
import NotFound404Page from '../components/NotFound404Page';
import BookForm from '../pages/BookForm';
import Login from '../pages/Login';
import Register from '../pages/Register';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "/books",
        element: <Home />
      },
      {
        path: "/books/:id",
        element: <BookDetail />
      },
      {
        path: "/create",
        element: <BookForm />
      },
      {
        path: "/edit/:id",
        element: <BookForm />
      },
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "*",
        element: <NotFound404Page />
      }
    ]
  },
]);

export { router }