import { useState } from "react";

function MultipleBtnsWrapper({ children, title }) {
  const [showBtns, setShowBtns] = useState(false);
  const handleClick = function () {
    setShowBtns(!showBtns);
  };

  return (
    <>
      <button
        onClick={handleClick}
        className={
          showBtns
            ? "btn bg-gray-500 hover:bg-gray-600 px-8 gap-2"
            : "btn bg-green-500 hover:bg-green-600 px-8 gap-2"
        }
      >
        {!showBtns && <i className="fa-solid fa-check"></i>}
        {showBtns && <i className="fa-solid fa-chevron-left"></i>}
        {!showBtns && <span>{title}</span>}
      </button>
      {showBtns && children}
    </>
  );
}

export default MultipleBtnsWrapper;
