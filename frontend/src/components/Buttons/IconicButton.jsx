import { SlIcon } from "@shoelace-style/shoelace/dist/react";
import Button from "./Button";

function IconicButton({ children, name, className, type, ...otherProps }) {
  return (
    <Button
      {...otherProps}
      className={(className ? className + " " : "") + "flex items-center gap-4"}
    >
      {type === "shoelace" && <SlIcon name={name} />}
      {type === "fontawesome" && <i className={name}></i>}
      <span>{children}</span>
    </Button>
  );
}

export default IconicButton;
