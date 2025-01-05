import React from "react";

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

export default Input;
