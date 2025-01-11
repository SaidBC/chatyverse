import { useEffect, useState } from "react";
import useLocalStorage from "./useLocalStorage";
import { redirect, useLocation, useMatch, useNavigate } from "react-router-dom";
import axios from "axios";
import decodeToken from "../utils/decodeToken";

const SERVER_API_URL = import.meta.env.VITE_SERVER_API_URL;

const authorizedRoutes = ["/profile", "/chat"];
const unAuthorizedRoutes = ["/auth", "/auth"];

const useAuth = function () {
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const [user, setUser] = useLocalStorage("user", null);
  const location = useLocation();
  const navigate = useNavigate();
  const isAuth = token && user;
  const isUnAuth = !token && !user;

  useEffect(() => {
    const checkRoutes = (r) => {
      const pathRegex = new RegExp(`^(${r})`);
      const match = pathRegex.test(location.pathname);
      return match;
    };
    if (isAuth && unAuthorizedRoutes.some(checkRoutes)) {
      navigate("/profile");
    }
    if (isUnAuth && authorizedRoutes.some(checkRoutes)) {
      navigate("/auth/login");
    }
  }, [token, navigate, user, location.pathname]);

  useEffect(() => {
    if (token) setUser(decodeToken(token));
    if (user && !token) {
      axios
        .get(SERVER_API_URL + "/auth/refreshToken", {
          withCredentials: true,
        })
        .then((res) => {
          if (res.data.success) setToken(res.data.data);
        })
        .catch((err) => {
          if (err.status === 401) return setUser(null);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [token]);
  return {
    loading,
    user,
    setUser,
    token,
    setToken,
  };
};

export default useAuth;
