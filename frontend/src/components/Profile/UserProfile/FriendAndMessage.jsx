import { SlIcon } from "@shoelace-style/shoelace/dist/react";
import { Link, useOutletContext } from "react-router-dom";
import useAppContext from "../../../hooks/useAppContext";
import VariantStatsFriendBtn from "./VariantStatsFriendBtn";
import useFetchAll from "../../../hooks/useFetchAll";
import { useState } from "react";
const SERVER_URL = "http://localhost:8000/api/v1";

function FriendAndMessage({ userId }) {
  const token = useAppContext().user;
  const { decodedUser } = useOutletContext();
  const opts = {
    method: "GET",
    headers: {
      authorization: "Bearer " + token,
    },
  };
  const friendRequestsURI =
    SERVER_URL +
    "/users/" +
    decodedUser.current.id +
    "/requests" +
    "?senderId=" +
    userId;
  const sentRequestsURI =
    SERVER_URL +
    "/users/" +
    decodedUser.current.id +
    "/requests/sent" +
    "?receiverId=" +
    userId;
  const myFriendsURI =
    SERVER_URL +
    "/users/" +
    decodedUser.current.id +
    "/friends" +
    "?friendId=" +
    userId;
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

export default FriendAndMessage;
