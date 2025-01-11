import { SlIcon } from "@shoelace-style/shoelace/dist/react";
import Bio from "./Bio";
import Avatar from "./Avatar";
import About from "./About";
import { useSearchParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import FooterBtns from "./FooterBtns";
import FriendAndMessage from "./FriendAndMessage";
import NotFoundError from "../../../components/Errors/NotFoundError";
import Loading from "../../../components/Loading";
import InternalServerError from "../../../components/Errors/InternalServerError";
import useAuthContext from "../../../hooks/useAuthContext";
const SERVER_API_URL = import.meta.env.VITE_SERVER_API_URL;

function UserProfile() {
  const [search] = useSearchParams();
  const { user: User } = useAuthContext();
  const userId = Number(search.get("id")) || Number(User.id);
  const isMyProfile = search.get("id") == User.id || !search.get("id");
  const {
    data: { data: user },
    error,
    loading,
    setData,
    setLoading,
  } = useFetch(SERVER_API_URL + `/users/${userId}`, {}, [userId]);
  if (loading) return <Loading />;
  if (error) {
    if (error.message === "Failed to fetch")
      return <InternalServerError message={"SERVER ERROR"} />;
    if (error.error.name === "NotFoundError")
      return <NotFoundError message={error.error.message} />;
    return <InternalServerError message={error.error.message} />;
  }
  const { birthday, createdAt, location, bio, username, profilePicture } = user;
  return (
    <div className=" bg-gray-900 w-full  xsm:w-11/12 mt-10 flex flex-col gap-10 p-8">
      <div className="flex gap-4 text-4xl">
        <SlIcon name="person-vcard" />
        <h1 className="font-extrabold">PROFILE</h1>
      </div>
      <div className="flex flex-col lg:flex-row lg:px-8 gap-10 lg:items-center">
        <Avatar username={username} profilePicture={profilePicture} />
        <Bio bio={bio} />
      </div>
      <About birthday={birthday} createdAt={createdAt} location={location} />
      {isMyProfile && (
        <FooterBtns setData={setData} setLoading={setLoading} userId={userId} />
      )}
      {!isMyProfile && <FriendAndMessage userId={userId} />}
    </div>
  );
}

export default UserProfile;
