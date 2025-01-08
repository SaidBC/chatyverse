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

export default DeclineBtn;
