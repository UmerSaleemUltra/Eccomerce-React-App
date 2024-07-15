import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dashboard from '../Views/Dashboard';
import Detail from '../Views/Detail';
import Signup from '../Views/Signup';
import Login from '../Views/Login';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/detail/:id",
    element: <Detail />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
