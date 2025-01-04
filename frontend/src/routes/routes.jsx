import Login from "../components/auth/login";
import Signup from "../components/auth/signup";
import IsAuth from "../IsAuth";
import Auth from "../components/auth";
import Profile from "../components/Profile";
import UserProfile from "../components/Profile/UserProfile";
import { Outlet, useOutletContext } from "react-router-dom";
import ChangeEmail from "../components/Profile/settings/ChangeEmail";
import ChangePassword from "../components/Profile/settings/ChangePassword";
import ChangeTheme from "../components/Profile/settings/ChangeTheme";
import EditProfile from "../components/Profile/settings/EditProfile";
import Chat from "../components/chat";
import ChatBoard from "../components/chat/ChatBoard";

const routes = [
  {
    path: "*",
    element: <IsAuth path="*" />,
  },
  {
    path: "/chat",
    element: <IsAuth children={<Chat />} path="/chat" />,
    children: [
      {
        path: ":friendId",
        element: <ChatBoard />,
      },
    ],
  },
  {
    path: "/profile",
    element: <IsAuth children={<Profile />} path="/profile" />,
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
    element: <IsAuth children={<Auth />} path="/auth" />,
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
];

export default routes;
