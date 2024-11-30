import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Util from "../../helpers/Util";
import { useDispatch, useSelector } from "react-redux";


function CheckAuth({ isAuthenticated, user, children }) {
    const dispatch = useDispatch();
    // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const location = useLocation();

    // Redirect to auth page if the user is not authenticated
    if (!isAuthenticated && !location.pathname.includes("/auth")) {
        return <Navigate to="/auth" />;
    }

    // Redirect authenticated users based on their roles from auth pages
    if (isAuthenticated && location.pathname.includes("/auth")) {
        if (user?.role === "admin") {
            return <Navigate to="/admin/dashboard" />;
        } else if (user?.role === "user") {
            return <Navigate to="/shop/home" />;
        }
    }

    // Prevent non-admin users from accessing admin routes
    if (isAuthenticated && user?.role !== "admin" && location.pathname.includes("admin")) {
        return <Navigate to="/unauth-page" />;
    }

    // Prevent admins from accessing shop routes
    if (isAuthenticated && user?.role === "admin" && location.pathname.includes("shop")) {
        return <Navigate to="/admin/dashboard" />;
    }

  return isAuthenticated ? children : <Navigate to="/auth" />;
}

export default CheckAuth;
