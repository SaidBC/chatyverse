import { SlIcon } from "@shoelace-style/shoelace/dist/react";
import { useState } from "react";
import ErrorText from "../../../../utils/ErrorText";
import AlertPopup from "../../../../utils/AlertPopup";

function AvatarForm({ handleSave, username: initialUsername }) {
  const [username, setUsername] = useState({
    value: initialUsername || "",
    errorMessage: false,
  });
  const [showAlert, setShowAlert] = useState({
    isPopped: false,
    title: "",
    content: "",
    variant: "",
  });
  return (
    <>
      <form className="flex flex-col gap-4" action="" method="post">
        <div className="flex items-center gap-4 text-2xl">
          <SlIcon name="person-square" />
          <h2 className="font-bold">AVATAR : </h2>
        </div>
        <div className="flex flex-col gap-1">
          <div className="relative w-32 h-32 bg-gray-950 rounded-full">
            <img
              className="w-full h-full rounded-full"
              src="https://cdn-icons-png.flaticon.com/512/3135/3135768.png"
              alt="profile image"
            />
          </div>
          <input type="file" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-lg font-bold" htmlFor="username">
            Usermame :
          </label>
          <input
            className="form-input"
            type="text"
            id="username"
            name="username"
            value={username.value}
            placeholder="Enter your new username"
            onChange={(e) => {
              setUsername(() => ({
                errorMessage: false,
                value: e.target.value,
              }));
            }}
          />
          {username.errorMessage && (
            <ErrorText content={username.errorMessage} />
          )}
        </div>
        <button
          className="btn"
          onClick={handleSave({ username, setUsername, setShowAlert })}
        >
          SAVE
        </button>
      </form>
      {showAlert.isPopped && (
        <AlertPopup alert={showAlert} setShowAlert={setShowAlert} />
      )}
    </>
  );
}

export default AvatarForm;
