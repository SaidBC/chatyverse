import { SlIcon } from "@shoelace-style/shoelace/dist/react";
import { useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import socket from "../../../socket";

function MessageBox({ handleScrollToBottom, userId, friendId, token }) {
  const { showNav } = useOutletContext();
  const [content, setContent] = useState("");
  const handleSendMessage = function (e) {
    e.preventDefault();
    socket.emit("send-message", { content, userId, friendId, token });
    setContent("");
  };

  return (
    <form className="flex gap-2 justify-center w-full px-6 mt-auto">
      {!showNav && (
        <Link
          to="/chat"
          className="w-12 h-12 bg-indigo-500 hover:bg-indigo-600 text-3xl rounded-full flex justify-center items-center"
        >
          <SlIcon name="arrow-left-circle" />
        </Link>
      )}
      <div className="  flex-grow">
        <input
          type="text"
          className="form-input w-full"
          onChange={(e) => setContent(e.target.value)}
          name="message-content"
          id="message-content"
          value={content}
        />
      </div>
      <button
        onClick={handleSendMessage}
        className="w-12 h-12 bg-indigo-500 hover:bg-indigo-600 text-3xl rounded-full flex justify-center items-center"
      >
        <SlIcon name="check-lg" />
      </button>
    </form>
  );
}

export default MessageBox;
