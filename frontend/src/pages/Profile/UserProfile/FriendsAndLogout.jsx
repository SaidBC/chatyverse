import ShowFriendsBtn from "./ShowFriendsBtn";
import LogoutBtn from "./LogoutBtn";

function FriendsAndLogout({ onShowModel }) {
  return (
    <div className="flex gap-2 w-full">
      <ShowFriendsBtn onShowModel={onShowModel} />
      <LogoutBtn />
    </div>
  );
}

export default FriendsAndLogout;
