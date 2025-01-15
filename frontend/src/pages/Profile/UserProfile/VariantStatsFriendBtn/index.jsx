import { useState } from "react";
import PropTypes from "prop-types";
import AddBtn from "./AddBtn";
import MultipleBtnsWrapper from "./MultipleBtnsWrapper";
import CancelBtn from "./CancelBtn";
import AcceptBtn from "./AcceptBtn";
import DeclineBtn from "./DeclineBtn";
import FriendsBtn from "./FriendsBtn";
import AlertPopup from "../../../../components/AlertPopup";
import Api from "../../../../api";

function VariantStatsFriendBtn({ token, userId, type }) {
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState({
    isPopped: false,
    title: "",
    content: "",
    variant: "",
  });
  const handleClick = function (path) {
    return function (e) {
      e.preventDefault();
      !showAlert.isPopped &&
        Api.friendRequest(path, token, setShowAlert, setLoading);
    };
  };
  return (
    <>
      {type === "none" && (
        <AddBtn
          loading={loading}
          receiverId={userId}
          handleClick={handleClick}
        />
      )}
      {type === "request" && (
        <MultipleBtnsWrapper title="Accept Friend">
          <AcceptBtn
            loading={loading}
            handleClick={handleClick}
            senderId={userId}
          />
          <DeclineBtn
            loading={loading}
            handleClick={handleClick}
            senderId={userId}
          />
        </MultipleBtnsWrapper>
      )}
      {type === "sent" && (
        <MultipleBtnsWrapper title="Sent Friend">
          <CancelBtn
            loading={loading}
            handleClick={handleClick}
            receiverId={userId}
          />
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
  token: PropTypes.any,
  userId: PropTypes.number.isRequired,
};
export default VariantStatsFriendBtn;
