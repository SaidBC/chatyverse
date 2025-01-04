import { useOutletContext } from "react-router-dom";

function CancelBtn({ receiverId, handleClick }) {
  const {
    decodedUser: {
      current: { id: senderId },
    },
  } = useOutletContext();
  return (
    <button
      onClick={handleClick(`/users/${receiverId}/requests/${senderId}/cancel`)}
      className="btn bg-red-500 hover:bg-red-600 px-8 gap-2"
    >
      <i className="fa-solid fa-xmark"></i>
      <span>Cancel</span>
    </button>
  );
}

export default CancelBtn;
