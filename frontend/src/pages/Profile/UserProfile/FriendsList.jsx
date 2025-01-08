import NoFriends from "./NoFriends";
import useFetch from "../../../hooks/useFetch";
import NotFoundError from "../../../components/NotFoundError";
import Loading from "../../../components/Loading";
import FriendBox from "../../../components/FriendBox";
const SERVER_URL = "http://localhost:8000/api/v1";

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
      {friends && friends.length ? (
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
            />
          );
        })
      ) : (
        <NoFriends />
      )}
    </ul>
  );
}

export default FriendsList;
