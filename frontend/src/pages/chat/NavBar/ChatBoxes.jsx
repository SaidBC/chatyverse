import useFetch from "../../../hooks/useFetch";
import ChatBox from "../../../components/ChatBox";
import useAppContext from "../../../hooks/useAppContext";
import FriendsList from "../../Profile/UserProfile/FriendsList";
import LastMessagesList from "./LastMessages";
const SERVER_URL = "http://localhost:8000/api/v1";

function ChatBoxes({ userId }) {
  const { user: token } = useAppContext();
  return (
    <ul className="flex flex-col gap-2  w-full overflow-y-auto grow-1">
      <li>
        <h1 className="text-xl font-extrabold text-slate-200">
          Last Messages :
        </h1>
        <LastMessagesList userId={userId} token={token} />
      </li>
      <li>
        <h1 className="text-xl font-extrabold text-slate-200">Friends :</h1>
        <FriendsList token={token} userId={userId} />
      </li>
    </ul>
  );
}
export default ChatBoxes;
