import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function App() {

    const theme = useSelector((state) => state.theme.theme);

    useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-200">
      <ToastContainer />
      <RouterProvider router={router} />
    </div>
  );
}
