import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster"

const App = () => {
  const theme = useSelector((state) => state.theme.theme);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Toast Notifications */}
      <ToastContainer />
      {/* Routes */}
      <Toaster />
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
