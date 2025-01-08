import { SlIcon } from "@shoelace-style/shoelace/dist/react";
import PropTypes from "prop-types";

function IconButton({ name, type, ...otherProps }) {
  return (
    <button {...otherProps}>
      {type === "shoelace" && <SlIcon name={name} />}
      {type === "fontawesome" && <i className={name}></i>}
    </button>
  );
}

IconButton.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["shoelace", "fontawesome"]).isRequired,
};

export default IconButton;
