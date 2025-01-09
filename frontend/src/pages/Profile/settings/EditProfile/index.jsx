import { SlIcon } from "@shoelace-style/shoelace/dist/react";
import BioForm from "./BioForm";
import AboutForm from "./AboutForm";
import AvatarForm from "./AvatarForm";
import useFetch from "../../../../hooks/useFetch";
import saveHelper from "../../../../utils/saveHelper";
import useAppContext from "../../../../hooks/useAppContext";
import NotFoundError from "../../../../components/Errors/NotFoundError";
import Loading from "../../../../components/Loading";
import UsernameForm from "./UsernameForm";
import InternalServerError from "../../../../components/Errors/InternalServerError";

const SERVER_API_URL = import.meta.env.VITE_SERVER_API_URL;

function EditProfile() {
  const { setToken, user: User, token } = useAppContext();
  const userId = Number(User.id);
  const {
    data: { data: user },
    error,
    loading,
  } = useFetch(SERVER_API_URL + `/users/${userId}`);
  if (loading) return <Loading />;
  if (error) {
    if (error.message === "Failed to fetch")
      return <InternalServerError message={"SERVER ERROR"} />;
    if (error.error.name === "NotFoundError")
      return <NotFoundError message={error.error.message} />;
    return <InternalServerError message={error.error.message} />;
  }
  const { birthday, location, bio, username, profilePicture } = user;
  const handleSave = function (data) {
    const { setShowAlert, ...form } = data;
    return function (e) {
      e.preventDefault();
      saveHelper(form, userId, token, setToken, setShowAlert);
    };
  };

  return (
    <div className=" bg-gray-900 w-full  xsm:w-11/12 mt-10 flex flex-col gap-10 p-8">
      <div className="flex gap-4 text-4xl">
        <SlIcon name="person-fill-gear" />
        <h1 className="font-extrabold">EDIT PROFILE</h1>
      </div>
      <div className="max-w-[30rem] flex flex-col gap-4">
        <AvatarForm
          profilePicture={profilePicture}
          token={token}
          userId={userId}
        />
        <UsernameForm username={username} handleSave={handleSave} />
        <AboutForm
          birthday={birthday}
          location={location}
          handleSave={handleSave}
        />
        <BioForm bio={bio} handleSave={handleSave} />
      </div>
    </div>
  );
}

export default EditProfile;
