import { Link } from "react-router-dom";
import FormattedTimeAgo from "./FormattedTimeAgo";

function ChatBox({ username, isActive, to, lastMessage = "" }) {
  return (
    <li className={isActive && "bg-indigo-700 rounded-lg"}>
      <Link
        to={to}
        className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-white/10"
      >
        <div className="relative w-16 h-16 bg-gray-950 rounded-full">
          <img
            className="w-full h-full rounded-full"
            src="https://cdn-icons-png.flaticon.com/512/3135/3135768.png"
            alt="profile image"
          />
          <div></div>
        </div>
        <div className="flex-grow">
          <div className="flex justify-between items-center">
            <span className="font-bold text-lg">{username}</span>
            <FormattedTimeAgo
              className="text-sm"
              date={lastMessage.createdAt}
            />
          </div>
          <div>
            <span className="text-sm">
              {lastMessage.content === ""
                ? "Empty message"
                : lastMessage.content}
            </span>
          </div>
        </div>
      </Link>
    </li>
  );
}

export default ChatBox;
