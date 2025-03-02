import { useAuth } from "@/context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import { Loader2 } from "lucide-react";

export function AuthGuard() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return <Outlet />;
}
