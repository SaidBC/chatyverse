import PropTypes from "prop-types";
import NoFriends from "./NoFriends";
import useFetch from "../../../hooks/useFetch";
import NotFoundError from "../../../components/Errors/NotFoundError";
import Loading from "../../../components/Loading";
import FriendBox from "../../../components/Boxes/FriendBox";
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

function FriendsList({ token, userId }) {
  const {
    data: { data: friends },
    loading,
    error,
  } = useFetch(SERVER_URL + "/users/" + userId + "/friends", {}, [userId]);

  if (loading) return <Loading />;
  if (error) {
    if (error.message === "Failed to fetch") return <>SERVER ERROR</>;
    if (error.error.name === "NotFoundError")
      return <NotFoundError message={error.error.message} />;
    return <>{error.error.message}</>;
  }
  return (
    <ul className="flex flex-col gap-2  w-full max-h-72 overflow-y-auto">
      {token && userId && friends.length ? (
        friends.map((friend) => {
          return (
            <FriendBox
              key={friend.id}
              username={friend.username}
              to={"?id=" + friend.id}
              friendId={friend.id}
              token={token}
              userId={userId}
              profilePicture={friend.profilePicture}
              online={friend.online}
              isActive={false}
            />
          );
        })
      ) : (
        <NoFriends />
      )}
    </ul>
  );
}

FriendsList.propTypes = {
  token: PropTypes.string.isRequired,
  userId: PropTypes.number.isRequired,
};

export default FriendsList;
