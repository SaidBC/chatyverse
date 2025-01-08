import PropTypes from "prop-types";
import { useCallback, useState } from "react";
import FriendsAndLogout from "./FriendsAndLogout";
import FriendsModal from "./FriendsModal";

const FooterBtns = function ({ friends, userId }) {
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
};

FooterBtns.propTypes = {
  friends: PropTypes.array.isRequired,
  userId: PropTypes.string.isRequired,
};

export default FooterBtns;
