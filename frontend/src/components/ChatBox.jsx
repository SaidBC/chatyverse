import { Link } from "react-router-dom";
import FormattedTimeAgo from "./FormattedTimeAgo";
import AvatarImage from "./AvatarImage";

function ChatBox({ username, profilePicture, isActive, to, lastMessage = "" }) {
  return (
    <li className={isActive && "bg-indigo-700 rounded-lg"}>
      <Link
        to={to}
        className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-white/10"
      >
        <AvatarImage
          src={profilePicture}
          alt="profile picture"
          className="relative w-16 h-16 bg-gray-950 rounded-full"
        />
        <div className="flex-grow">
          <div className="flex justify-between items-center">
            <span className="font-bold text-lg">{username}</span>

            {lastMessage.createdAt != null && (
              <FormattedTimeAgo
                className="text-sm"
                date={new Date(lastMessage.createdAt)}
              />
            )}
          </div>
          <div>
            <span className="text-sm">
              {lastMessage.content === ""
                ? "Empty message"
                : lastMessage.content === null
                ? "No messages sent"
                : lastMessage.content}
            </span>
          </div>
        </div>
      </Link>
    </li>
  );
}

export default ChatBox;
