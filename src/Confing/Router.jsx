import React from 'react';
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import Dashboard from '../Views/Dashboard';
import Detail from '../Views/Details';

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
    ]);

    return <RouterProvider router={router} />;
};

export default Router;
