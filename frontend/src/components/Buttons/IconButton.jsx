import { SlIcon } from "@shoelace-style/shoelace/dist/react";

function IconButton({ children, name, type, ...otherProps }) {
  return (
    <button {...otherProps}>
      {type === "shoelace" && <SlIcon name={name} />}
      {type === "fontawesome" && <i className={name}></i>}
    </button>
  );
}

export default IconButton;
