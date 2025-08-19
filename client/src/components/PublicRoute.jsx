import React from "react";
import { Navigate } from "react-router-dom";
import { useSession } from "../contexts/SessionContext";

const PublicRoute = ({ children }) => {
  const { user, loading } = useSession();

  if (loading) return <p>Loading...</p>;

  if (user) return <Navigate to="/" replace />;

  return children;
};

export default PublicRoute;
