import { createBrowserRouter, Outlet, RouterProvider, useNavigate, } from "react-router-dom";
import Dashboard from "../Views/Dashboard";
import Signup from "../Views/Signup";
import AddProduct from "../Views/AddProduct";
import LoginUser from "../Views/Login";
import Detail from "../Views/Detail";
import Header from "../Views/Header";
import { auth, onAuthStateChanged } from "./Firebase";
import { useEffect, useState } from "react";
import Login from "../Views/Login";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [{
            path: "/",
            element: <div><Dashboard /></div>,
        },
        {
            path: "/signup",
            element: <div><Signup /></div>,
        },
        {
            path: "/addproduct",
            element: <div><AddProduct /></div>,
        },
        {
            path: "/Login",
            element: <div><Login /></div>,
        },
        // {
        //     path: "/notfound",
        //     element: <div><NotFound /></div>,
        // },
        {
            path: "/detail/:adId",
            element: <div>{<Detail />}</div>,
        }]
    },
]);

function Main() {
    const [user, setUser] = useState()
    const navigate = useNavigate()

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setUser(user)
        });
    }, [])
    useEffect(() => {
        const {pathname} = window.location
        if (user) {
            console.log('user logged in', user)
        }
        else {
            console.log('please logged in !')
            if (pathname === '/addproduct') {
                navigate('/signin')
            }
        }
    }, [window.location.pathname, user])
    return <div>
        <Outlet />
    </div>

}

function Routers() {
    return <RouterProvider router={router} />
}
export default Routers;