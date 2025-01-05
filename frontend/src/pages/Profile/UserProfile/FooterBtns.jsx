import { useState } from "react";
import FriendsAndLogout from "./FriendsAndLogout";
import FriendsModal from "./FriendsModal";

const FooterBtns = function ({ friends, userId }) {
  const [isModelOpen, setIsModelOpen] = useState(false);
  const onCloseModel = function () {
    setIsModelOpen(false);
  };
  const onShowModel = function () {
    setIsModelOpen(true);
  };
  return (
    <>
      <FriendsAndLogout onShowModel={onShowModel} />
      <FriendsModal
        onCloseModal={onCloseModel}
        isModelOpen={isModelOpen}
        friends={friends}
        userId={userId}
      />
    </>
  );
};

export default FooterBtns;
