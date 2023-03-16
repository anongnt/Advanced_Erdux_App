import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/home-page";
import RegisterPage from "../pages/register-page";
import routerDashbord from "./dashboard";
import Login from "./../pages/login-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  ...routerDashbord,
]);

export default router;
