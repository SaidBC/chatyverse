import { useOutletContext } from "react-router-dom";

function DeclineBtn({ senderId, handleClick }) {
  const {
    decodedUser: {
      current: { id: receiverId },
    },
  } = useOutletContext();
  return (
    <button
      onClick={handleClick(`/users/${receiverId}/requests/${senderId}/decline`)}
      className="btn bg-red-500 hover:bg-red-600 px-8 gap-2"
    >
      <i className="fa-solid fa-xmark"></i>
      <span>Decline </span>
    </button>
  );
}

export default DeclineBtn;
