import useFetch from "../../../hooks/useFetch";
import { useParams } from "react-router-dom";
import IconButton from "../../../components/Buttons/IconButton";
const SERVER_URL = import.meta.env.VITE_SERVER_API_URL;

function Header() {
  const { friendId } = useParams();
  const {
    data: { data: friend },
    loading,
  } = useFetch(SERVER_URL + "/users/" + friendId);
  if (loading) return <>Loading</>;
  return (
    <header className="flex items-center gap-4  py-4 px-6  border-b-[1px] border-white/25">
      <div className="relative w-14 h-14 bg-gray-950 rounded-full">
        <img
          className="w-full h-full rounded-full"
          src={friend.profilePicture}
          alt="profile image"
        />
        <div></div>
      </div>
      <div>
        <div className="flex justify-between items-center">
          <span className="font-bold text">{friend.username}</span>
        </div>
        <div>
          <span className="text-xs">
            {friend.online ? "ONLINE" : "OFFLINE"}
          </span>
        </div>
      </div>
      <IconButton
        className="ml-auto hover:bg-white/10 w-12 h-12 rounded-full flex justify-center items-center text-2xl"
        name="three-dots-vertical"
        type="shoelace"
      />
    </header>
  );
}

export default Header;
