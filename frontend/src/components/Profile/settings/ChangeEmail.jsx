import { SlIcon } from "@shoelace-style/shoelace/dist/react";
import { useRef, useState } from "react";
import ErrorText from "../../../utils/ErrorText";
import saveHelper from "../../../utils/saveHelper";
import useDecodeToken from "../../../hooks/useDecodeToken";
import useAppContext from "../../../hooks/useAppContext";
import AlertPopup from "../../../utils/AlertPopup";

function ChangeEmail() {
  const { setUser, user: token } = useAppContext();
  const userId = useDecodeToken(token).current.id;
  const [password, setPassword] = useState({
    value: "",
    errorMessage: false,
  });
  const [email, setEmail] = useState({
    value: "",
    errorMessage: false,
  });
  const [newEmail, setNewEmail] = useState({
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
      email,
      setEmail,
      newEmail,
      setNewEmail,
    };
    saveHelper(form, userId, token, setUser, setShowAlert);
  };

  return (
    <div className=" bg-gray-900 w-full  xsm:w-11/12 mt-10 flex flex-col gap-10 p-8">
      <div className="flex gap-4 text-4xl">
        <SlIcon name="envelope-at-fill" />
        <h1 className="font-extrabold">CHANGE EMAIL</h1>
      </div>
      <div className="max-w-[30rem]">
        <form
          className="flex flex-col gap-3 [&>div]:flex [&>div]:flex-col [&>div]:gap-1 "
          action=""
          method="post"
        >
          <div>
            <label className="text-lg font-bold" htmlFor="email">
              Email :
            </label>
            <input
              value={email.value}
              onChange={({ target: { value } }) =>
                setEmail(() => ({ errorMessage: false, value }))
              }
              className="form-input"
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
            />
            {email.errorMessage && <ErrorText content={email.errorMessage} />}
          </div>
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
            <label className="text-lg font-bold" htmlFor="new-email">
              New Email :
            </label>
            <input
              value={newEmail.value}
              onChange={({ target: { value } }) =>
                setNewEmail(() => ({ errorMessage: false, value }))
              }
              className="form-input"
              type="email"
              id="new-email"
              name="new-email"
              placeholder="Enter your new email"
            />
            {newEmail.errorMessage && (
              <ErrorText content={newEmail.errorMessage} />
            )}
          </div>
          <button onClick={handleSave} className="btn">
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

export default ChangeEmail;
