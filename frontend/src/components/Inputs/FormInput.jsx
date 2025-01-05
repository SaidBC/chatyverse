import ErrorText from "../ErrorText";
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

export default FormInput;
