import { SlIcon } from "@shoelace-style/shoelace/dist/react";
import useFetch from "../../../hooks/useFetch";
import { useParams } from "react-router-dom";
const SERVER_URL = "http://localhost:8000/api/v1";

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
          src="https://cdn-icons-png.flaticon.com/512/3135/3135768.png"
          alt="profile image"
        />
        <div></div>
      </div>
      <div>
        <div className="flex justify-between items-center">
          <span className="font-bold text">{friend.username}</span>
        </div>
        <div>
          <span className="text-xs">ONLINE</span>
        </div>
      </div>
      <button className="ml-auto hover:bg-white/10 w-12 h-12 rounded-full flex justify-center items-center text-2xl">
        <SlIcon name="three-dots-vertical" />
      </button>
    </header>
  );
}

export default Header;
