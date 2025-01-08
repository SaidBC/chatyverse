import PropTypes from "prop-types";
import { SlIcon } from "@shoelace-style/shoelace/dist/react";
import { useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import socket from "../../../socket";
import IconButton from "../../../components/Buttons/IconButton";

function MessageBox({ userId, friendId, token }) {
  const { showNav } = useOutletContext();
  const [content, setContent] = useState("");
  const handleSendMessage = function (e) {
    e.preventDefault();
    socket.emit("message:send", { content, userId, friendId, token });
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
      <IconButton
        onClick={handleSendMessage}
        type="shoelace"
        name={"check-lg"}
        className="w-12 h-12 bg-indigo-500 hover:bg-indigo-600 text-3xl rounded-full flex justify-center items-center"
      />
    </form>
  );
}

MessageBox.propTypes = {
  userId: PropTypes.string.isRequired,
  friendId: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
};

export default MessageBox;
