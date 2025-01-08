import ChatBox from "../../../components/ChatBox";
import FriendBox from "../../../components/FriendBox";

function SearchResults({ results, token, userId }) {
  return (
    <ul className="flex flex-col gap-2  w-full max-h-72 overflow-y-auto">
      {results &&
        results.length &&
        results.map((result) => {
          return (
            <FriendBox
              key={result.id}
              username={result.username}
              to={"./" + result.id}
              friendId={result.id}
              token={token}
              userId={userId}
              profilePicture={result.profilePicture}
              online={result.online}
            />
          );
        })}
    </ul>
  );
}

export default SearchResults;
