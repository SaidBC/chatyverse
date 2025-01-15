import PropTypes from "prop-types";
import { useOutletContext } from "react-router-dom";
import IconicButton from "../../../../components/Buttons/IconicButton";

function DeclineBtn({ senderId, handleClick, loading }) {
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
      {loading ? "Declining..." : "Decline"}
    </IconicButton>
  );
}

DeclineBtn.propTypes = {
  senderId: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default DeclineBtn;
