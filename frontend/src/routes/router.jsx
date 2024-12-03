import { createBrowserRouter } from "react-router-dom";
import {  ErrorPage, HomePage, LayoutPage } from "../pages/Layout";
import Auth from "@/components/Auth/Auth";
import { AdminDashboard, AdminFeatures, AdminOrders, AdminProducts } from "@/pages/AdminView";
import ShoppingLayout from "@/components/ShoppingView/ShoppingLayout";
import { ShoppingAccount, ShoppingCheckout, ShoppingHomePage, ShoppingListingPage } from "@/pages/ShoppingView";
import CheckAuth from "@/components/Common/CheckAuth";
import AdminLayout from "@/components/AdminView/AdminLayout";
import UnauthPage from "@/pages/Layout/UnauthPage";
import {ResetPassword,ForgotPassword,GoogleCallback} from "../pages/Auth/index"
import { useDispatch, useSelector } from "react-redux";


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
                    <CheckAuth>
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
              <CheckAuth>
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
                path: "users",
                children: [
                    {
                        path : "forgotpassword",
                        element: <ForgotPassword/>
                    },
                    {
                        path: "resetpassword",
                        element: <ResetPassword />
                    },
                    {
                        path: "auth",
                        children: [
                        {
                            path: "googleCallback",
                            element: <GoogleCallback />,
                        },
                        ],
                    },
                ]
            },
            {
                path: "unauth-page",
                element: <UnauthPage/>
            },
        ]
    }
]);
