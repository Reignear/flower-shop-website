import { createBrowserRouter } from "react-router-dom";
import AdminProtectedRoutes from "@/routes/admin-protected-routes";
import NotFound from "@/pages/unavailable/not-found";
import UserProtectedRoutes from "@/routes/user-protected-routes";
import { AdminRoutes } from "@/routes/admin-routes";
import { UserRoutes } from "@/routes/user-routes";
import { PublicRoutes } from "@/routes/public-routes";
import { AuthRoutes } from "@/routes/auth-routes";

export const router = createBrowserRouter([
  ...PublicRoutes,
  ...AuthRoutes,
  { element: <AdminProtectedRoutes />, children: AdminRoutes },
  { element: <UserProtectedRoutes />, children: UserRoutes },
  { path: "*", element: <NotFound /> },
]);
