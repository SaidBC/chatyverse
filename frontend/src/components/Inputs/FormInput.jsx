import PropTypes from "prop-types";
import ErrorText from "../Errors/ErrorText";
import Input from "./Input";

function FormInput({ className, errorMessage, setInput, ...otherProps }) {
  return (
    <Input
      onChange={(e) =>
        setInput(() => ({
          errorMessage: false,
          value: e.target.value,
        }))
      }
      className={"form-input" + (className ? " " + className : "")}
      {...otherProps}
    >
      {errorMessage && <ErrorText content={errorMessage} />}
    </Input>
  );
}

FormInput.propTypes = {
  className: PropTypes.string,
  errorMessage: PropTypes.string,
  setInput: PropTypes.func.isRequired,
};

export default FormInput;
