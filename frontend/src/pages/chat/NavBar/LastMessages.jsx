import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import socket from "../../../socket";
import ChatBox from "../../../components/Boxes/ChatBox";

function LastMessagesList({ token, userId }) {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const handleReceiveMessages = (data) => {
      setMessages(data);
    };
    socket.emit(
      "last-messages:receive",
      { token, userId },
      handleReceiveMessages
    );
  }, [token, userId]);
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
                createdAt: message.createdAt,
              }}
              profilePicture={message.authorProfilePicture}
              online={message.authorOnline}
              isActive={false}
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

LastMessagesList.propTypes = {
  token: PropTypes.any,
  userId: PropTypes.number.isRequired,
};

export default LastMessagesList;
