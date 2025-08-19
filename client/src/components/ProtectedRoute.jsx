import React from "react";
import { Navigate } from "react-router-dom";
import { useSession } from "../contexts/SessionContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useSession();

  if (loading) return <p>Loading...</p>;

  if (!user) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;
