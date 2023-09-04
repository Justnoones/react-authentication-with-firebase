import React, { useContext } from 'react';
import Home from '../pages/Home';
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Layout from '../Layouts/Layout';
import BookDetail from '../components/BookDetail';
import NotFound404Page from '../components/NotFound404Page';
import BookForm from '../pages/BookForm';
import Login from '../pages/Login';
import Register from '../pages/Register';
import { AuthContext } from '../context/AuthContext';


export default function Router() {

  let { authReady, user } = useContext(AuthContext)

  const isAuthenicated = Boolean(user);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "",
          element: isAuthenicated ? <Home /> : <Navigate to="login" />
        },
        {
          path: "/books/:id",
          element: isAuthenicated ? <BookDetail /> : <Navigate to="login" />
        },
        {
          path: "/create",
          element: isAuthenicated ? <BookForm /> : <Navigate to="login" />
        },
        {
          path: "/edit/:id",
          element: isAuthenicated ? <BookForm /> : <Navigate to="login" />
        },
        {
          path: "/register",
          element: !isAuthenicated ? <Register /> : <Navigate to="/" />
        },
        {
          path: "/login",
          element: !isAuthenicated ? <Login /> : <Navigate to="/" />
        },
        {
          path: "*",
          element: <NotFound404Page />
        }
      ]
    },
  ]);

  return (
    authReady && <RouterProvider router={router} />
  )
}
