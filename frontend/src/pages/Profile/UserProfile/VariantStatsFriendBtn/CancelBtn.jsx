import { useOutletContext } from "react-router-dom";
import IconicButton from "../../../../components/Buttons/IconicButton";

function CancelBtn({ receiverId, handleClick }) {
  const {
    user: { id: senderId },
  } = useOutletContext();
  return (
    <IconicButton
      onClick={handleClick(`/users/${receiverId}/requests/${senderId}/cancel`)}
      type="fontawesome"
      name="fa-solid fa-xmark"
      className="bg-red-500 hover:bg-red-600 px-8"
    >
      Cancel
    </IconicButton>
  );
}

export default CancelBtn;
