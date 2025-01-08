import PropTypes from "prop-types";
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

FriendsAndLogout.propTypes = {
  onShowModel: PropTypes.func.isRequired,
};

export default FriendsAndLogout;
