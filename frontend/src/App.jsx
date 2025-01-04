import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routes/routes.jsx";
import { createContext, useMemo } from "react";
import useLocalStorage from "./hooks/useLocalStorage.js";

const router = createBrowserRouter(routes);
export const AppContext = createContext({ user: false });

function App() {
  const [user, setUser] = useLocalStorage("user", null);
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);
  return (
    <AppContext.Provider value={value}>
      <RouterProvider router={router} />
    </AppContext.Provider>
  );
}

export default App;
