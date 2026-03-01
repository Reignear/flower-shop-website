import AdminSignin from "@/pages/auth/admin/signin";
import UserSignin from "@/pages/auth/user/signin";
import UserSignup from "@/pages/auth/user/signup";

export const AuthRoutes = [
  { path: "/admin/signin", element: <AdminSignin /> },
  { path: "/user/signin", element: <UserSignin /> },
  { path: "/user/signup", element: <UserSignup /> },
];
