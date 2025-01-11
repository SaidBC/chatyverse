import Login from "../pages/auth/login";
import Signup from "../pages/auth/signup";
import Auth from "../pages/auth";
import Profile from "../pages/Profile";
import UserProfile from "../pages/Profile/UserProfile";
import { Navigate, Outlet } from "react-router-dom";
import ChangeEmail from "../pages/Profile/settings/ChangeEmail";
import ChangePassword from "../pages/Profile/settings/ChangePassword";
import ChangeTheme from "../pages/Profile/settings/ChangeTheme";
import EditProfile from "../pages/Profile/settings/EditProfile";
import Chat from "../pages/chat";
import ChatBoard from "../pages/chat/ChatBoard";
import NoChat from "../pages/chat/ChatBoard/NoChat";
import AuthProvider from "../AuthProvider";
import PageNotFoundError from "../components/Errors/PageNotFoundError";

const routes = [
  {
    path: "/",
    element: <AuthProvider />,
    errorElement: <PageNotFoundError />,
    children: [
      {
        index: true,
        element: <Navigate to="/auth/login" />,
      },
      {
        path: "/chat",
        element: <Chat />,
        children: [
          {
            index: true,
            element: <NoChat />,
          },
          {
            path: ":friendId",
            element: <ChatBoard />,
          },
        ],
      },
      {
        path: "/profile",
        element: <Profile />,
        children: [
          {
            index: true,
            element: <UserProfile />,
          },
          {
            path: "settings",
            element: <Outlet />,
            children: [
              {
                path: "profile",
                element: <EditProfile />,
              },
              {
                path: "email",
                element: <ChangeEmail />,
              },
              {
                path: "password",
                element: <ChangePassword />,
              },
              {
                path: "theme",
                element: <ChangeTheme />,
              },
            ],
          },
        ],
      },
      {
        path: "/auth",
        element: <Auth />,
        children: [
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "signup",
            element: <Signup />,
          },
        ],
      },
    ],
  },
];

export default routes;
