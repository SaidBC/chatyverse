import { useOutletContext } from "react-router-dom";
import IconicButton from "../../../../components/Buttons/IconicButton";

function AcceptBtn({ senderId, handleClick }) {
  const {
    decodedUser: {
      current: { id: receiverId },
    },
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

export default AcceptBtn;
