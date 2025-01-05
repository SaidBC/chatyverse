import { SlIcon } from "@shoelace-style/shoelace/dist/react";
import Button from "./Button";

function IconicButton({ children, name, className, type, ...otherProps }) {
  return (
    <Button
      {...otherProps}
      className={
        " flex items-center gap-4" + (className ? " " + className : "")
      }
    >
      {type === "shoelace" && <SlIcon name={name} />}
      {type === "fontawsome" && <i className={name}></i>}
      <span>{children}</span>
    </Button>
  );
}

export default IconicButton;
