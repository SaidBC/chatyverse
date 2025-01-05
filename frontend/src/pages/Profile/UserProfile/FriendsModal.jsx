import { useEffect } from "react";
import ChatBox from "../../../components/ChatBox";
import useAppContext from "../../../hooks/useAppContext";
import IconButton from "../../../components/Buttons/IconButton";

function FriendsModal({ onCloseModal, isModelOpen, friends, userId }) {
  const { user: token } = useAppContext();
  useEffect(() => {
    const onCloseWithKey = (e) => {
      if (e.key === "Escape") return onCloseModal();
    };
    window.addEventListener("keydown", onCloseWithKey);
    return () => {
      window.removeEventListener("keydown", onCloseWithKey);
    };
  }, []);
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
        <ul className="flex flex-col gap-2  w-full max-h-72 overflow-y-scroll">
          {friends?.map((friend) => {
            return (
              <ChatBox
                key={friend.id}
                username={friend.username}
                to={"?id=" + friend.id}
                friendId={friend.id}
                token={token}
                userId={userId}
              />
            );
          })}
        </ul>
      </dialog>
    </>
  );
}
export default FriendsModal;
