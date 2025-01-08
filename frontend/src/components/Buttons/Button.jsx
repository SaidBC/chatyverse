import PropTypes from "prop-types";

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

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};
export default Button;
