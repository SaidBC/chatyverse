import PropTypes from "prop-types";
import { useCallback, useState } from "react";
import FriendsAndLogout from "./FriendsAndLogout";
import FriendsModal from "./FriendsModal";

function FooterBtns({ friends, userId }) {
  const [isModelOpen, setIsModelOpen] = useState(false);
  const onCloseModel = useCallback(function () {
    setIsModelOpen(false);
  }, []);
  const onShowModel = useCallback(function () {
    setIsModelOpen(true);
  }, []);
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
}

FooterBtns.propTypes = {
  friends: PropTypes.array,
  userId: PropTypes.number.isRequired,
};

export default FooterBtns;
