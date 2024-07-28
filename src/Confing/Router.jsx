import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dashboard from '../Views/Dashboard';
import Detail from '../Views/Detail';
import Signup from '../Views/Signup';
import Login from '../Views/Login';
import AddProduct from '../Views/AddProduct';

const router = createBrowserRouter([
    {
        path: "/Dashboard",
        element: <Dashboard />,
    },
    {
        path: "/detail/:id",
        element: <Detail />,
    },
    {
        path: "/",
        element: <Signup />,
    },
    {
        path: "/Login",
        element: <Login />,
    },
    {
        path: "/addproduct",
        element: <AddProduct />,
    },
   
   
]);

const Router = () => {
    return <RouterProvider router={router} />;
};

export default Router;
