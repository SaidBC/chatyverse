import PropTypes from "prop-types";
import FriendBox from "../../../components/Boxes/FriendBox";

function SearchResults({ results, token, userId }) {
  return (
    <ul className="flex flex-col gap-2  w-full max-h-72 overflow-y-auto">
      {results?.length &&
        token &&
        userId &&
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
SearchResults.propTypes = {
  results: PropTypes.array.isRequired,
  token: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};

export default SearchResults;
