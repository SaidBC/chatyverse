import PropTypes from "prop-types";
import { useOutletContext } from "react-router-dom";
import IconicButton from "../../../../components/Buttons/IconicButton";

function AcceptBtn({ senderId, handleClick }) {
  const {
    user: { id: receiverId },
  } = useOutletContext();
  return (
    <IconicButton
      onClick={handleClick(`/users/${receiverId}/requests/${senderId}/accept`)}
      type="fontawesome"
      name="fa-solid fa-plus"
      className="bg-green-500 hover:bg-green-600 px-8"
    >
      Accept
    </IconicButton>
  );
}

AcceptBtn.propTypes = {
  senderId: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default AcceptBtn;
