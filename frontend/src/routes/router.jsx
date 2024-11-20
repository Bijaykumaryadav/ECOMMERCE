import { createBrowserRouter } from "react-router-dom";
import { HomePage, ErrorPage, LayoutPage } from "../pages";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <LayoutPage />, 
        errorElement: <ErrorPage />, 
        children: [
            {
                index: true,
                element: <HomePage />
            }
        ]
    }
]);
