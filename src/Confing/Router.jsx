// src/Config/Router.jsx

import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dashboard from '../Views/Dashboard';
import Detail from '../Views/Details';
import Signup from '../Views/Signup';
import Login from '../Views/Login';

const Router = () => {
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
            path: "/Login",
            element: <Login />,
        },
    ]);

    return <RouterProvider router={router} />;
};

export default Router;
