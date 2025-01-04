import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "./App";
import useAppContext from "./hooks/useAppContext";
const SERVER_URL = "http://localhost:8000/api/v1";
function IsAuth({ path, children }) {
  const { user } = useAppContext();
  if (path.startsWith("/auth") && user) return <Navigate to="/profile" />;
  if (path.startsWith("/profile") && !user)
    return <Navigate to="/auth/login" />;
  if (path.startsWith("/chat") && !user) return <Navigate to="/auth/login" />;
  if (path.startsWith("/messages") && !user)
    return <Navigate to="/auth/login" />;
  if (!user && path == "*") return <Navigate to="/auth/login" />;
  if (user && path == "*") return <Navigate to="/profile" />;
  return children;
}

export default IsAuth;
