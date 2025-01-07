import { useEffect, useState } from "react";
import ChatBox from "./ChatBox";
import useConnnectUser from "../hooks/useConnectUser";
import socket from "../socket";

function FriendBox({
  username,
  isActive,
  to,
  userId,
  token,
  profilePicture,
  friendId,
}) {
  if (!userId || !token || !friendId) return;
  const [lastMessage, setLastMessage] = useState({
    content: "",
    createdAt: "",
  });
  const connection = socket.connected || useConnnectUser();
  useEffect(() => {
    const cb = function (content, createdAt) {
      const lastMessageTime = `${new Date(createdAt).getHours()}:${new Date(
        createdAt
      ).getMinutes()}`;
      setLastMessage({ content, createdAt: lastMessageTime });
    };
    socket.emit("last-message:receive", { token, userId, friendId }, cb);
  }, [socket]);
  return (
    <ChatBox
      userId={userId}
      token={token}
      friendId={friendId}
      profilePicture={profilePicture}
      lastMessage={lastMessage}
      username={username}
      isActive={isActive}
      to={to}
    />
  );
}

export default FriendBox;
