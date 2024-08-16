import React, { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider, useNavigate, Outlet, Route, } from 'react-router-dom';
import Dashboard from '../Views/Dashboard';
import Detail from '../Views/Detail';
import Signup from '../Views/Signup';
import Login from '../Views/Login';
import AddProduct from '../Views/AddProduct';
import Header from '../Views/Header';
import { onAuthStateChanged, auth } from './Firebase'; // Ensure correct imports

// Main component with auth logic and routing
function Main() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const { pathname } = window.location;

    if (user) {
      console.log('User logged in:', user);
      if (pathname === '/login') {
        navigate('/');
      }
    } else {
      console.log('User logged out');
      if (pathname === '/addproduct') {
        navigate('/login');
      }
    }
  }, [navigate, user]);

  return (
    <div>
      <Outlet />
    </div>
  );
}

// PrivateRoute component for handling protected routes
const PrivateRoute = ({ element }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  if (user === null) {
    return null; // Optionally show a loading spinner or placeholder
  }

  return user ? element : <Navigate to="/login" />;
};

// Define your router configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <PrivateRoute element={<Dashboard />} />,
      },
      {
        path: "/detail/:id",
        element: <PrivateRoute element={<Detail />} />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/addproduct",
        element: <PrivateRoute element={<AddProduct />} />,
      },
    ],
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
