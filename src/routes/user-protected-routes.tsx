import { AuthProvider } from "@/context/auth-context";
import { useAuth } from "@/hooks/use-auth";
import Loading from "@/pages/loading/loading";
import { Navigate, Outlet } from "react-router-dom";

function UserRouteGuard() {
  const { user, role, loading } = useAuth();

  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  if (!user || role !== "user") {
    return <Navigate to="/user/signin" replace />;
  }
  return <Outlet />;
}

export default function UserProtectedRoutes() {
  return (
    <AuthProvider>
      <UserRouteGuard />
    </AuthProvider>
  );
}
