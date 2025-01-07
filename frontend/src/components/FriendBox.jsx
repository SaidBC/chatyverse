import { createRef, useEffect, useState } from "react";
import ChatBox from "./ChatBox";
import socket from "../socket";
import PulseBox from "./PulseBox";

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
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const cb = function (content, createdAt) {
      setLastMessage({ content, createdAt: createdAt });
      setLoading(false);
    };
    socket.emit("last-message:receive", { token, userId, friendId }, cb);
    return () => {
      setLoading(true);
    };
  }, [socket]);
  return (
    <>
      {!loading ? (
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
      ) : (
        <PulseBox />
      )}
    </>
  );
}

export default FriendBox;
