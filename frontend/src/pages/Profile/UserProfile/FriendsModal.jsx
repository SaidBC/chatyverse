import PropTypes from "prop-types";
import { useEffect } from "react";
import useAuthContext from "../../../hooks/useAuthContext";
import IconButton from "../../../components/Buttons/IconButton";
import FriendsList from "./FriendsList";

function FriendsModal({ onCloseModal, isModelOpen, userId }) {
  const { token } = useAuthContext();
  useEffect(() => {
    const onCloseWithKey = (e) => {
      if (e.key === "Escape") return onCloseModal();
    };
    window.addEventListener("keydown", onCloseWithKey);
    return () => {
      window.removeEventListener("keydown", onCloseWithKey);
    };
  }, [onCloseModal]);
  return (
    <>
      {isModelOpen && <div className="fixed inset-0 bg-gray-950/80"></div>}
      <dialog
        open={isModelOpen}
        className="fixed top-40 right-auto left-1/2 -translate-x-1/2  w-96 px-4 py-2 rounded bg-gray-900 text-white"
      >
        <div className="flex justify-between pl-4 my-4">
          <h1 className="font-bold text-3xl">Friends :</h1>
          <IconButton
            className="hover:bg-white/20 px-3 py-1.5 text-xl rounded-md"
            type="fontawesome"
            name="fa-solid fa-xmark"
            onClick={onCloseModal}
          />
        </div>
        <FriendsList userId={userId} token={token} />
      </dialog>
    </>
  );
}

FriendsModal.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
  isModelOpen: PropTypes.bool.isRequired,
  userId: PropTypes.number.isRequired,
};

export default FriendsModal;
