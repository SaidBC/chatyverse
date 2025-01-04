import { SlIcon } from "@shoelace-style/shoelace/dist/react";

function ShowFriendsBtn({ onShowModel }) {
  return (
    <button className="btn px-8 gap-2" onClick={onShowModel}>
      <SlIcon name="people" />
      <span>Friends</span>
    </button>
  );
}

export default ShowFriendsBtn;
