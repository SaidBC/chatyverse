import PropTypes from "prop-types";
const Input = ({
  name,
  label,
  type,
  value,
  onChange,
  className,
  children,
  ...otherProps
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-lg font-bold">
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={className}
        data-testid={name}
        {...otherProps}
      />
      {children}
    </div>
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Input;
