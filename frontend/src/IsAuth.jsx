import { Navigate } from "react-router-dom";
import useAppContext from "./hooks/useAppContext";
import PropTypes from "prop-types";

function IsAuth({ path, children }) {
  // const { user } = useAppContext();
  // if (path.startsWith("/auth") && user) return <Navigate to="/profile" />;
  // if (path.startsWith("/profile") && !user)
  //   return <Navigate to="/auth/login" />;
  // if (path.startsWith("/chat") && !user) return <Navigate to="/auth/login" />;
  // if (path.startsWith("/messages") && !user)
  //   return <Navigate to="/auth/login" />;
  // if (!user && path == "*") return <Navigate to="/auth/login" />;
  // if (user && path == "*") return <Navigate to="/profile" />;
  return children;
}

IsAuth.propTypes = {
  path: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default IsAuth;
