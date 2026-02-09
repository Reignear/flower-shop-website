import { Navigate, Outlet } from "react-router-dom";
import { AuthProvider } from "@/context/auth-context";
import { useAuth } from "@/hooks/use-auth";
import { ThreeDot } from "react-loading-indicators";
function AdminRouteGuard() {
  const { user, role, loading } = useAuth();

  if (loading) {
    return (
      <>
        <div className="bg-blur">
          <ThreeDot color={["#000000", "#000000", "#000000", "#000000"]} />
        </div>
        <div style={{ filter: "blur(4px)" }}>
          <Outlet />
        </div>
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
