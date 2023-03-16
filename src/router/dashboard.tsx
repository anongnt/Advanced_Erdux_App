import { RouteObject } from "react-router-dom";
import DLayout from "../pages/dashboard/d-layout";
import DLeave from "../pages/dashboard/d-leave";
import DHome from "./../pages/dashboard/d-home";
import DManageLeave from "./../pages/dashboard/d-manage-leave";
import AuthGuard from "./../guards/auth-guard";
import PermissionDenied from "../pages/dashboard/permission-denied";
import DEditProfile from "../pages/dashboard/d-edit-profile";

const routerDashbord: RouteObject[] = [
  {
    path: "/dashboard",
    // element: <AuthGuard />,
    element: <DLayout />,
    children: [
      {
        path: "", //http://localhost:4000/dashboard
        element: <DHome />,
      },
      {
        path: "reguest-for-leave", //http://localhost:4000/reguest-for-leave
        element: <DLeave />,
      },
      {
        path: "manage-leave", //http://localhost:4000/manage-leave
        element: <DManageLeave />,
      },
      {
        path: "edit-profile", //http://localhost:4000/manage-leave
        element: <DEditProfile />,
      },
      {
        path: "permission-denied",
        element: <PermissionDenied />,
      },
    ],
  },
];

export default routerDashbord;
