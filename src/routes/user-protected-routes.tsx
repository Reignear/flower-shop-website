import { AuthProvider } from "@/context/auth-context";
import { useAuth } from "@/hooks/use-auth";
import { ThreeDot } from "react-loading-indicators";
import { Navigate, Outlet } from "react-router-dom";

function UserRouteGuard() {
  const { user, role, loading } = useAuth();

  if (loading) {
    <>
      <div className="bg-blur">
        <ThreeDot color={["#000000", "#000000", "#000000", "#000000"]} />
      </div>
      <div style={{ filter: "blur(4px)" }}>
        <Outlet />
      </div>
    </>;
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
