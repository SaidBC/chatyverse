import PropTypes from "prop-types";
import IconicButton from "../../../components/Buttons/IconicButton";

function ShowFriendsBtn({ onShowModel }) {
  return (
    <IconicButton
      type="shoelace"
      onClick={onShowModel}
      name="people"
      className="px-8"
    >
      Friends
    </IconicButton>
  );
}

ShowFriendsBtn.propTypes = {
  onShowModel: PropTypes.func.isRequired,
};

export default ShowFriendsBtn;
