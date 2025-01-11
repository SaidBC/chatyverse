import { SlIcon } from "@shoelace-style/shoelace/dist/react";
import { useState } from "react";
import saveHelper from "../../../utils/saveHelper";
import useAuthContext from "../../../hooks/useAuthContext";
import AlertPopup from "../../../components/AlertPopup";
import Button from "../../../components/Buttons/Button";
import FormInput from "../../../components/Inputs/FormInput";

function ChangeEmail() {
  const { user } = useAuthContext();
  const userId = user.id;
  const [password, setPassword] = useState({
    value: "",
    errorMessage: "",
  });
  const [email, setEmail] = useState({
    value: "",
    errorMessage: "",
  });
  const [newEmail, setNewEmail] = useState({
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
      email,
      setEmail,
      newEmail,
      setNewEmail,
    };
    saveHelper(form, userId, setShowAlert);
  };

  return (
    <div className="bg-gray-900 w-full xsm:w-11/12 mt-10 flex flex-col gap-10 p-8">
      <div className="flex gap-4 text-4xl">
        <SlIcon name="envelope-at-fill" />
        <h1 className="font-extrabold">CHANGE EMAIL</h1>
      </div>
      <div className="max-w-[30rem]">
        <form className="flex flex-col gap-3" action="" method="post">
          <FormInput
            type="email"
            label="Email :"
            name="email"
            setInput={setEmail}
            placeholder="Enter your email"
            errorMessage={email.errorMessage}
            value={email.value}
          />
          <FormInput
            type="password"
            label="Password :"
            name="password"
            setInput={setPassword}
            placeholder="Enter your password"
            errorMessage={password.errorMessage}
            value={password.value}
          />
          <FormInput
            type="email"
            label="New Email :"
            name="new-email"
            setInput={setNewEmail}
            placeholder="Enter your new email"
            errorMessage={newEmail.errorMessage}
            value={newEmail.value}
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

export default ChangeEmail;
