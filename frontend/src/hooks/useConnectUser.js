import { useEffect, useState } from "react";
import socket from "../socket";

function useConnnectUser() {
  const [isConnected, setIsConnected] = useState(false);
  useEffect(() => {
    socket.connect();
    const onConnect = function () {
      setIsConnected(true);
    };
    socket.on("connect", onConnect);
    return () => {
      socket.off("connect", onConnect);
    };
  }, []);
  return isConnected;
}

export default useConnnectUser;
