import PropTypes from "prop-types";
import useAppContext from "../../../hooks/useAppContext";
import FriendsList from "../../Profile/UserProfile/FriendsList";
import LastMessagesList from "./LastMessages";
import SearchResults from "./SearchResults";

function ChatBoxes({ userId, isSearching, results, connection }) {
  const { token } = useAppContext();
  return (
    <ul className="flex flex-col gap-2  w-full overflow-y-auto grow-1">
      {!isSearching && (
        <>
          <li>
            <h1 className="text-xl font-extrabold text-slate-200">
              Last Messages :
            </h1>
            <LastMessagesList
              userId={userId}
              token={token}
              connection={connection}
            />
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
  userId: PropTypes.string.isRequired,
  isSearching: PropTypes.bool.isRequired,
  results: PropTypes.array.isRequired,
  connection: PropTypes.object.isRequired,
};

export default ChatBoxes;
