import { useState } from "react";
import friendRequestHandle from "../../../../utils/friendRequestHandle";
import PropTypes from "prop-types";
import AddBtn from "./AddBtn";
import MultipleBtnsWrapper from "./MultipleBtnsWrapper";
import CancelBtn from "./CancelBtn";
import AcceptBtn from "./AcceptBtn";
import DeclineBtn from "./DeclineBtn";
import FriendsBtn from "./FriendsBtn";
import AlertPopup from "../../../../components/AlertPopup";

function VariantStatsFriendBtn({ token, userId, type }) {
  const [showAlert, setShowAlert] = useState({
    isPopped: false,
    title: "",
    content: "",
    variant: "",
  });
  const handleClick = function (path) {
    return function (e) {
      e.preventDefault();
      !showAlert.isPopped && friendRequestHandle(path, token, setShowAlert);
    };
  };
  return (
    <>
      {type === "none" && (
        <AddBtn receiverId={userId} handleClick={handleClick} />
      )}
      {type === "request" && (
        <MultipleBtnsWrapper title="Accept Friend">
          <AcceptBtn handleClick={handleClick} senderId={userId} />
          <DeclineBtn handleClick={handleClick} senderId={userId} />
        </MultipleBtnsWrapper>
      )}
      {type === "sent" && (
        <MultipleBtnsWrapper title="Sent Friend">
          <CancelBtn handleClick={handleClick} receiverId={userId} />
        </MultipleBtnsWrapper>
      )}
      {type === "friend" && <FriendsBtn />}
      {showAlert.isPopped && (
        <AlertPopup alert={showAlert} setShowAlert={setShowAlert} />
      )}
    </>
  );
}

VariantStatsFriendBtn.propTypes = {
  type: PropTypes.oneOf(["none", "friend", "sent", "request"]).isRequired,
  token: PropTypes.string.isRequired,
  userId: PropTypes.number.isRequired,
};
export default VariantStatsFriendBtn;
