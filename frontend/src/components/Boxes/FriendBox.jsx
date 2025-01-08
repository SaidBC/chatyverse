import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import ChatBox from "./ChatBox";
import socket from "../../socket";
import PulseBox from "./PulseBox";

function FriendBox({
  username,
  isActive,
  to,
  userId,
  token,
  profilePicture,
  friendId,
  online,
}) {
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
      socket.off("last-message:receive", cb);
      setLoading(true);
    };
  }, [userId, token, friendId]);
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
          online={online}
        />
      ) : (
        <PulseBox />
      )}
    </>
  );
}

FriendBox.propTypes = {
  userId: PropTypes.number.isRequired,
  token: PropTypes.string.isRequired,
  friendId: PropTypes.number.isRequired,
  profilePicture: PropTypes.string.isRequired,
  lastMessage: PropTypes.shape({
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }),
  username: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  to: PropTypes.string.isRequired,
  online: PropTypes.bool.isRequired,
};

export default FriendBox;
