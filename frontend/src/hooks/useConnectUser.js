import { useEffect, useState } from "react";
import socket from "../socket";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:8000/api/v1";
function useConnnectUser({ token, userId }) {
  const [isConnected, setIsConnected] = useState(false);
  useEffect(() => {
    if (token && userId && !socket.connected) {
      socket.connect();
      socket.emit("app:connect", userId, token);
    }
    const onConnect = function () {
      setIsConnected(true);
    };
    const onDisconnect = function () {
      setIsConnected(false);
    };
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, [token, userId]);
  return { isConnected };
}

export default useConnnectUser;
