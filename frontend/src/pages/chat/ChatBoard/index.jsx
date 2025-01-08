import { useEffect, useRef, useState } from "react";
import Header from "./Header";
import Message from "./Message";
import MessageBox from "./MessageBox";
import socket from "../../../socket";
import { useOutletContext, useParams } from "react-router-dom";
import formateTime from "../../../utils/formateTime";

function ChatBoard() {
  const { token, userId } = useOutletContext();
  const { friendId } = useParams();
  const [messages, setMessages] = useState([]);
  const ChatBoardMessagesRef = useRef();
  const EndOfMessagesRef = useRef();
  const handleScrollToBottom = function () {
    ChatBoardMessagesRef?.current.scroll({
      top: 10000,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    const onReceiveMessages = function (messages) {
      setMessages(messages);
    };
    const onReceiveMessage = function (message) {
      setMessages((prev) => [...prev, message]);
      handleScrollToBottom();
    };
    socket.emit("chat:join", { token, userId, friendId });
    socket.on("messages:receive", onReceiveMessages);
    socket.on("message:receive", onReceiveMessage);
    return () => {
      socket.off("messages:receive", onReceiveMessages);
      socket.off("message:receive", onReceiveMessage);
    };
  }, [token, userId, friendId]);
  return (
    <div className="flex flex-col w-full xsm:w-11/12 min-h-96 h-full xsm:h-auto  bg-gray-900 xsm:mt-14 xsm:rounded-3xl pb-5">
      <Header />
      <div className="p-8">
        <ul
          id="chat-messages"
          ref={ChatBoardMessagesRef}
          className="flex flex-col gap-2 px-2 overflow-y-auto max-h-96 xsm:max-h-80 "
        >
          {messages.map((message) => {
            const sender = userId === message.authorId ? "you" : "friend";
            const createdAt = formateTime(new Date(message.createdAt));
            return (
              <Message
                key={message.id}
                content={message.content}
                createdAt={createdAt}
                sender={sender}
              />
            );
          })}
          <li ref={EndOfMessagesRef}></li>
        </ul>
      </div>
      <MessageBox
        token={token}
        userId={userId}
        friendId={friendId}
        handleScrollToBottom={handleScrollToBottom}
      />
    </div>
  );
}

export default ChatBoard;
