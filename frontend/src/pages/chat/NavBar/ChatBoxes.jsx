import PropTypes from "prop-types";
import useAuthContext from "../../../hooks/useAuthContext";
import FriendsList from "../../Profile/UserProfile/FriendsList";
import LastMessagesList from "./LastMessages";
import SearchResults from "./SearchResults";

function ChatBoxes({ userId, isSearching, results }) {
  const { token } = useAuthContext();
  return (
    <ul className="flex flex-col gap-2  w-full overflow-y-auto grow-1">
      {!isSearching && (
        <>
          <li>
            <LastMessagesList userId={userId} token={token} />
          </li>
          <li>
            <h1 className="text-xl font-extrabold text-slate-200">Friends :</h1>
            <FriendsList token={token} userId={userId} />
          </li>
        </>
      )}
      {isSearching && (
        <li>
          <h1 className="text-xl font-extrabold text-slate-200">Results :</h1>
          <SearchResults results={results} token={token} userId={userId} />
        </li>
      )}
    </ul>
  );
}

ChatBoxes.propTypes = {
  userId: PropTypes.number.isRequired,
  isSearching: PropTypes.bool.isRequired,
  results: PropTypes.array.isRequired,
};

export default ChatBoxes;
