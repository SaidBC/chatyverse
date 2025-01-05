function Button({ className, children, ...otherProps }) {
  return (
    <button
      {...otherProps}
      className={"btn" + (className ? " " + className : "")}
    >
      {children}
    </button>
  );
}
export default Button;
