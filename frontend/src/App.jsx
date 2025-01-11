import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routes/routes.jsx";
import { useEffect, useMemo } from "react";
import useLocalStorage from "./hooks/useLocalStorage.js";
import decodeToken from "./utils/decodeToken.js";
import useConnnectUser from "./hooks/useConnectUser.js";
import AppContext from "./contexts/AppContext.jsx";
import useAuth from "./hooks/useAuth.js";

const router = createBrowserRouter(routes);

function App() {
  // const { isConnected } = useConnnectUser({ token, userId: user?.id });
  // useEffect(() => {
  //   if (token) {
  //     setUser(decodeToken(token));
  //   }
  //   if (!token && user) setUser(null);
  // }, [token]);
  return (
    <AppContext.Provider value={null}>
      <RouterProvider router={router} />
    </AppContext.Provider>
  );
}

export default App;
