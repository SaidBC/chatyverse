function Button({ className, children, ...otherProps }) {
  return (
    <button
      {...otherProps}
      className={(className ? className + " " : "") + "btn"}
    >
      {children}
    </button>
  );
}
export default Button;
