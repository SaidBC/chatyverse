import { SlIcon } from "@shoelace-style/shoelace/dist/react";
import { useRef, useState } from "react";
import ErrorText from "../../../utils/ErrorText";
import saveHelper from "../../../utils/saveHelper";
import useDecodeToken from "../../../hooks/useDecodeToken";
import useAppContext from "../../../hooks/useAppContext";
import AlertPopup from "../../../utils/AlertPopup";

function ChangePassword() {
  const { setUser, user: token } = useAppContext();
  const userId = useDecodeToken(token).current.id;
  const [password, setPassword] = useState({
    value: "",
    errorMessage: false,
  });
  const [newPassword, setNewPassword] = useState({
    value: "",
    errorMessage: false,
  });
  const [confirmNewPassword, setConfirmNewPassword] = useState({
    value: "",
    errorMessage: false,
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
    saveHelper(form, userId, token, setUser, setShowAlert);
  };
  return (
    <div className=" bg-gray-900 w-full  xsm:w-11/12 mt-10 flex flex-col gap-10 p-8">
      <div className="flex gap-4 text-4xl">
        <SlIcon name="shield-lock-fill" />
        <h1 className="font-extrabold">CHANGE PASSWORD</h1>
      </div>
      <div className="max-w-[30rem]">
        <form
          className="flex flex-col gap-3 [&>div]:flex [&>div]:flex-col [&>div]:gap-1 "
          action=""
          method="post"
        >
          <div>
            <label className="text-lg font-bold" htmlFor="password">
              Password :
            </label>
            <input
              value={password.value}
              onChange={({ target: { value } }) =>
                setPassword(() => ({ errorMessage: false, value }))
              }
              className="form-input"
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
            />
            {password.errorMessage && (
              <ErrorText content={password.errorMessage} />
            )}
          </div>
          <div>
            <label className="text-lg font-bold" htmlFor="new-password">
              New Password :
            </label>
            <input
              value={newPassword.value}
              onChange={({ target: { value } }) =>
                setNewPassword(() => ({ errorMessage: false, value }))
              }
              className="form-input"
              type="password"
              id="new-password"
              name="new-password"
              placeholder="Enter your new password"
            />
            {newPassword.errorMessage && (
              <ErrorText content={newPassword.errorMessage} />
            )}
          </div>
          <div>
            <label className="text-lg font-bold" htmlFor="confirm-new-password">
              Confirm Password :
            </label>
            <input
              value={confirmNewPassword.value}
              onChange={({ target: { value } }) =>
                setConfirmNewPassword(() => ({ errorMessage: false, value }))
              }
              className="form-input"
              type="password"
              id="confirm-new-password"
              name="confirm-new-password"
              placeholder="Confirm your new password"
            />
            {confirmNewPassword.errorMessage && (
              <ErrorText content={confirmNewPassword.errorMessage} />
            )}
          </div>
          <button className="btn" onClick={handleSave}>
            SAVE
          </button>
        </form>
        {showAlert.isPopped && (
          <AlertPopup alert={showAlert} setShowAlert={setShowAlert} />
        )}
      </div>
    </div>
  );
}

export default ChangePassword;
