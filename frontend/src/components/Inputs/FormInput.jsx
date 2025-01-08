import PropTypes from "prop-types";
import ErrorText from "../Errors/ErrorText";
import Input from "./Input";
import { memo } from "react";

const FormInput = memo(function FormInput({
  className,
  errorMessage,
  setInput,
  ...otherProps
}) {
  return (
    <Input
      onChange={(e) =>
        setInput(() => ({
          errorMessage: "",
          value: e.target.value,
        }))
      }
      className={"form-input" + (className ? " " + className : "")}
      {...otherProps}
    >
      {errorMessage && <ErrorText content={errorMessage} />}
    </Input>
  );
});

FormInput.propTypes = {
  className: PropTypes.string,
  errorMessage: PropTypes.string,
  setInput: PropTypes.func.isRequired,
};

export default FormInput;
