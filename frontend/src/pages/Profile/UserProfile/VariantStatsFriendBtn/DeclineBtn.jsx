import PropTypes from "prop-types";
import { useOutletContext } from "react-router-dom";
import IconicButton from "../../../../components/Buttons/IconicButton";

function DeclineBtn({ senderId, handleClick }) {
  const {
    user: { id: receiverId },
  } = useOutletContext();
  return (
    <IconicButton
      onClick={handleClick(`/users/${receiverId}/requests/${senderId}/decline`)}
      type="fontawesome"
      name="fa-solid fa-xmark"
      className="bg-red-500 hover:bg-red-600 px-8"
    >
      Decline
    </IconicButton>
  );
}

DeclineBtn.propTypes = {
  senderId: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default DeclineBtn;
