import PropTypes from "prop-types";
import { useState } from "react";
import IconicButton from "../../../../components/Buttons/IconicButton";

function MultipleBtnsWrapper({ children, title }) {
  const [showBtns, setShowBtns] = useState(false);
  const handleClick = function () {
    setShowBtns(!showBtns);
  };

  return (
    <>
      <IconicButton
        type="fontawesome"
        name={!showBtns ? "fa-solid fa-check" : "fa-solid fa-chevron-left"}
        className={
          showBtns
            ? "btn bg-gray-500 hover:bg-gray-600 px-8 gap-2"
            : "btn bg-green-500 hover:bg-green-600 px-8 gap-2"
        }
        onClick={handleClick}
      >
        {!showBtns && title}
      </IconicButton>
      {showBtns && children}
    </>
  );
}

MultipleBtnsWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

export default MultipleBtnsWrapper;
