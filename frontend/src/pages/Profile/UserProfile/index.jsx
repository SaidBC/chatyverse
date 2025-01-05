import { SlIcon } from "@shoelace-style/shoelace/dist/react";
import Bio from "./Bio";
import Avatar from "./Avatar";
import About from "./About";
import {
  useLocation,
  useOutletContext,
  useSearchParams,
} from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import FooterBtns from "./FooterBtns";
import FriendAndMessage from "./FriendAndMessage";
const SERVER_URL = "http://localhost:8000/api/v1";

function UserProfile({ profileImage }) {
  const [search] = useSearchParams();
  const { decodedUser } = useOutletContext();
  const userId = search.get("id") || decodedUser.current.id;
  const isMyProfile =
    search.get("id") == decodedUser.current.id || !search.get("id");
  const {
    data: { data: user },
    error,
    loading,
    setData,
    setLoading,
  } = useFetch(SERVER_URL + `/users/${userId}`);

  const {
    data: { data: friends },
  } = useFetch(SERVER_URL + "/users/" + userId + "/friends");
  if (loading) return <>Loading ....</>;
  if (error.message === "Failed to fetch") return <>SERVER ERROR</>;
  if (error) return <>{error.error.message}</>;
  const { birthday, createdAt, location, bio, username } = user;
  return (
    <div className=" bg-gray-900 w-full  xsm:w-11/12 mt-10 flex flex-col gap-10 p-8">
      <div className="flex gap-4 text-4xl">
        <SlIcon name="person-vcard" />
        <h1 className="font-extrabold">PROFILE</h1>
      </div>
      <div className="flex flex-col lg:flex-row lg:px-8 gap-10 lg:items-center">
        <Avatar username={username} profileImage={profileImage} />
        <Bio bio={bio} />
      </div>
      <About birdthday={birthday} createdAt={createdAt} location={location} />
      {isMyProfile && (
        <FooterBtns
          setData={setData}
          setLoading={setLoading}
          friends={friends}
          userId={userId}
        />
      )}
      {!isMyProfile && <FriendAndMessage userId={userId} />}
    </div>
  );
}

export default UserProfile;
