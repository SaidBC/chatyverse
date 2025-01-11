import { useMemo } from "react";
import AuthContext from "./contexts/AuthContext";
import useAuth from "./hooks/useAuth";
import { Outlet } from "react-router-dom";
import useConnnectUser from "./hooks/useConnectUser";

function AuthProvider() {
  const { loading, user, setUser, token, setToken } = useAuth();
  const { isConnected } = useConnnectUser({ token, userId: user?.id });
  const value = useMemo(
    () => ({ user, setUser, token, setToken, isConnected }),
    [user, setUser, token, setToken, isConnected]
  );
  if (loading) return <>Loading ...</>;
  return (
    <AuthContext.Provider value={value}>
      <Outlet />
    </AuthContext.Provider>
  );
}

export default AuthProvider;
