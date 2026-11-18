import { Navigate, Outlet } from "react-router-dom";
import useGetUserInfo from "../hooks/useGetUserInfo";

export default function ProtectedRoute({ admin = false }) {
  const { data: user, isLoading, isError } = useGetUserInfo();

  if (isLoading) return <div>Chargement…</div>;
  if (isError || !user) return <Navigate to="/signin" replace />;
  if (admin && !user.admin) return <Navigate to="/dashboard" replace />;
  return <Outlet />;
}
