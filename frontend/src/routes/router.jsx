import { createBrowserRouter } from "react-router-dom";
import { HomePage, ErrorPage, LayoutPage } from "../pages";
import Auth from "@/components/Auth/Auth";

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
            }
        ]
    }
]);
