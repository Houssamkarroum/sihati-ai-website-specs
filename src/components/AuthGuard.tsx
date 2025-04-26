
import { Navigate, useLocation } from "react-router-dom";

// In a real app, this would be handled by your auth system
const isAuthenticated = () => {
  return localStorage.getItem("isAuthenticated") === "true";
};

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const location = useLocation();

  if (!isAuthenticated()) {
    // Redirect to login while saving the attempted URL
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return <>{children}</>;
};

export default AuthGuard;
