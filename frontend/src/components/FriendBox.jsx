import ChatBox from "./ChatBox";

function FriendBox({ username, isActive, to, userId, token, friendId }) {
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
      console.log(lastMessage);
      setLastMessage({ content, createdAt: lastMessageTime });
    };
    socket.emit("last-message:receive", { token, userId, friendId }, cb);
  }, [socket]);
  return (
    <ChatBox
      userId={userId}
      token={token}
      friendId={friendId}
      lastMessage={lastMessage}
      username={username}
      isActive={isActive}
      to={to}
    />
  );
}

export default FriendBox;
