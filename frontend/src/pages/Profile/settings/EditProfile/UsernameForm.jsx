import PropTypes from "prop-types";
import { useState } from "react";
import FormInput from "../../../../components/Inputs/FormInput";
import Button from "../../../../components/Buttons/Button";
import AlertPopup from "../../../../components/AlertPopup";

function UsernameForm({ username: initialUsername, handleSave }) {
  const [showAlert, setShowAlert] = useState({
    isPopped: false,
    title: "",
    content: "",
    variant: "",
  });
  const [username, setUsername] = useState({
    value: initialUsername || "",
    errorMessage: false,
  });
  return (
    <form className="flex flex-col gap-4" action="" method="post">
      <FormInput
        label="Username :"
        name="username"
        type="text"
        setInput={setUsername}
        placeholder="Enter your new username"
        errorMessage={username.errorMessage}
        value={username.value}
      />
      <Button onClick={handleSave({ username, setUsername, setShowAlert })}>
        SAVE
      </Button>
      {showAlert.isPopped && (
        <AlertPopup alert={showAlert} setShowAlert={setShowAlert} />
      )}
    </form>
  );
}

UsernameForm.propTypes = {
  username: PropTypes.string.isRequired,
  handleSave: PropTypes.func.isRequired,
};

export default UsernameForm;
