import { createBrowserRouter } from "react-router-dom";
import {  ErrorPage, HomePage, LayoutPage } from "../pages/Layout";
import Auth from "@/components/Auth/Auth";
import { AdminDashboard, AdminFeatures, AdminOrders, AdminProducts } from "@/pages/AdminView";
import ShoppingLayout from "@/components/ShoppingView/ShoppingLayout";
import { ShoppingAccount, ShoppingCheckout, ShoppingHomePage, ShoppingListingPage } from "@/pages/ShoppingView";
import CheckAuth from "@/components/Common/CheckAuth";
import AdminLayout from "@/components/AdminView/AdminLayout";
import UnauthPage from "@/pages/Layout/UnauthPage";
import AuthRegister from "@/pages/Auth/register";

const isAuthenticated = true;
const user = {
    name: "Bijay",
    role: "user",
};



export const router = createBrowserRouter([
    {
        path: "/",
        element: <LayoutPage />, 
        errorElement: <ErrorPage />, 
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: "auth",
                element: <Auth/>
            },
            {
                path: "admin",
                element: (
                    <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                        <AdminLayout />
                    </CheckAuth>
                ),
                children: [
                    {
                        path: "dashboard",
                        element: <AdminDashboard/>
                    },
                    {
                        path: "products",
                        element: <AdminProducts/>
                    },
                    {
                        path: "orders",
                        element: <AdminOrders/>
                    },
                    {
                        path: "features",
                        element: <AdminFeatures/>
                    }
                ]
            },
            {
                path: "shop",
                element: (
              <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                <ShoppingLayout />
              </CheckAuth>
            ),
                children: [
                    {
                        path: "home",
                        element: <ShoppingHomePage/>
                    },
                    {
                        path: "listing",
                        element: <ShoppingListingPage/>
                    },
                    {
                        path: "checkout",
                        element: <ShoppingCheckout/>
                    },
                    {
                        path: "account",
                        element: <ShoppingAccount/>
                    }
                ]
            },
            {
                path: "unauth-page",
                element: <UnauthPage/>
            },
        ]
    }
]);
