import { Navigate, Outlet } from "react-router-dom";
import { AuthProvider } from "@/context/auth-context";
import { useAuth } from "@/hooks/use-auth";
import Loading from "@/pages/loading/loading";
function AdminRouteGuard() {
  const { user, role, loading } = useAuth();

  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
  }
  if (!user || role !== "admin") {
    return <Navigate to="/admin/signin" replace />;
  }
  return <Outlet />;
}
export default function AdminProtectedRoutes() {
  return (
    <AuthProvider>
      <AdminRouteGuard />
    </AuthProvider>
  );
}
