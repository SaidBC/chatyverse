import PropTypes from "prop-types";
import { SlIcon } from "@shoelace-style/shoelace/dist/react";
import { Link } from "react-router-dom";
import useAuthContext from "../../../hooks/useAuthContext";
import VariantStatsFriendBtn from "./VariantStatsFriendBtn";
import useFetchAll from "../../../hooks/useFetchAll";
const SERVER_API_URL = import.meta.env.VITE_SERVER_API_URL;

function FriendAndMessage({ userId }) {
  const { token, user } = useAuthContext();
  const opts = {
    method: "GET",
    headers: {
      authorization: "Bearer " + token,
    },
  };
  const friendRequestsURI =
    SERVER_API_URL + "/users/" + user.id + "/requests" + "?senderId=" + userId;
  const sentRequestsURI =
    SERVER_API_URL +
    "/users/" +
    user.id +
    "/requests/sent" +
    "?receiverId=" +
    userId;
  const myFriendsURI =
    SERVER_API_URL + "/users/" + user.id + "/friends" + "?friendId=" + userId;
  const { data, loading } = useFetchAll([
    [friendRequestsURI, opts],
    [sentRequestsURI, opts],
    [myFriendsURI, {}],
  ]);
  if (loading) return <>Loading ...</>;
  const types = ["request", "sent", "friend"];
  const type = types.filter((t, i) => data.get(i).data.length)[0];
  return (
    <div className="flex gap-2 w-full">
      <VariantStatsFriendBtn
        type={type || "none"}
        token={token}
        userId={userId}
      />

      <Link to={"/chat/" + userId} className="btn px-8 gap-2">
        <SlIcon name="chat-text" />
        <span>Message</span>
      </Link>
    </div>
  );
}

FriendAndMessage.propTypes = {
  userId: PropTypes.number.isRequired,
};

export default FriendAndMessage;
