import { useEffect, useState } from "react";
import socket from "../../../socket";
import ChatBox from "../../../components/ChatBox";
import timesAgo from "../../../utils/timesAgo";

function LastMessagesList({ token, userId }) {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    socket.emit("last-messages:receive", { token, userId }, (data) => {
      setMessages(data);
    });
  }, [socket]);
  return (
    <ul className="flex flex-col gap-2  w-full max-h-72 overflow-y-auto">
      {messages?.length ? (
        messages.map((message) => {
          return (
            <ChatBox
              key={message.authorId}
              username={message.authorUsername}
              to={`${message.authorId}`}
              lastMessage={{
                content: message.content,
                createdAt: new Date(message.createdAt),
              }}
            />
          );
        })
      ) : (
        <></>
        // <NoMessages />
      )}
    </ul>
  );
}

export default LastMessagesList;
