import { useOutletContext } from "react-router-dom";

function AcceptBtn({ senderId, handleClick }) {
  const {
    decodedUser: {
      current: { id: receiverId },
    },
  } = useOutletContext();
  return (
    <button
      onClick={handleClick(`/users/${receiverId}/requests/${senderId}/accept`)}
      className="btn bg-green-500 hover:bg-green-600 px-8 gap-2"
    >
      <i className="fa-solid fa-plus"></i>
      <span>Accept</span>
    </button>
  );
}

export default AcceptBtn;
