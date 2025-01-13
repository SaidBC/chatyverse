import { SlIcon } from "@shoelace-style/shoelace/dist/react";
import { useState } from "react";
import saveHelper from "../../../utils/saveHelper";
import useAuthContext from "../../../hooks/useAuthContext";
import AlertPopup from "../../../components/AlertPopup";
import Button from "../../../components/Buttons/Button";
import FormInput from "../../../components/Inputs/FormInput";

function ChangePassword() {
  const { user, token } = useAuthContext();
  const userId = user.id;
  const [password, setPassword] = useState({
    value: "",
    errorMessage: "",
  });
  const [newPassword, setNewPassword] = useState({
    value: "",
    errorMessage: "",
  });
  const [confirmNewPassword, setConfirmNewPassword] = useState({
    value: "",
    errorMessage: "",
  });
  const [showAlert, setShowAlert] = useState({
    isPopped: false,
    title: "",
    content: "",
    variant: "",
  });
  const handleSave = function (e) {
    e.preventDefault();
    const form = {
      password,
      setPassword,
      newPassword,
      setNewPassword,
      confirmNewPassword,
      setConfirmNewPassword,
    };
    saveHelper(form, userId, token, setShowAlert);
  };
  return (
    <div className="bg-gray-900 w-full xsm:w-11/12 mt-10 flex flex-col gap-10 p-8">
      <div className="flex gap-4 text-4xl">
        <SlIcon name="shield-lock-fill" />
        <h1 className="font-extrabold">CHANGE PASSWORD</h1>
      </div>
      <div className="max-w-[30rem]">
        <form className="flex flex-col gap-3" action="" method="post">
          <FormInput
            label="Password :"
            name="password"
            setInput={setPassword}
            placeholder="Enter your password"
            errorMessage={password.errorMessage}
            type="password"
            value={password.value}
          />
          <FormInput
            label="New Password :"
            name="new-password"
            setInput={setNewPassword}
            placeholder="Enter your new password"
            errorMessage={newPassword.errorMessage}
            type="password"
            value={newPassword.value}
          />
          <FormInput
            label="Confirm Password :"
            name="confirm-new-password"
            setInput={setConfirmNewPassword}
            placeholder="Confirm your new password"
            errorMessage={confirmNewPassword.errorMessage}
            type="password"
            value={confirmNewPassword.value}
          />
          <Button onClick={handleSave}>SAVE</Button>
        </form>
        {showAlert.isPopped && (
          <AlertPopup alert={showAlert} setShowAlert={setShowAlert} />
        )}
      </div>
    </div>
  );
}

export default ChangePassword;
