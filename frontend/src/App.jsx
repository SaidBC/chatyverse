import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routes/routes.jsx";
import { createContext, useEffect, useMemo } from "react";
import useLocalStorage from "./hooks/useLocalStorage.js";
import decodeToken from "./utils/decodeToken.js";
import useConnnectUser from "./hooks/useConnectUser.js";

const router = createBrowserRouter(routes);
export const AppContext = createContext({ user: false });

function App() {
  const [token, setToken] = useLocalStorage("token", null);
  const [user, setUser] = useLocalStorage("user", null);
  const { isConnected } = useConnnectUser({ token, userId: user?.id });
  useEffect(() => {
    if (token) {
      setUser(decodeToken(token));
    }
  }, [token]);
  const value = useMemo(
    () => ({ token, setToken, user, setUser, isConnected }),
    [token, setToken, user, setUser, isConnected]
  );
  return (
    <AppContext.Provider value={value}>
      <RouterProvider router={router} />
    </AppContext.Provider>
  );
}

export default App;
