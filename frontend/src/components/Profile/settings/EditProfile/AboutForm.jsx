import { SlIcon } from "@shoelace-style/shoelace/dist/react";
import { useState } from "react";
import ErrorText from "../../../../utils/ErrorText";
import AlertPopup from "../../../../utils/AlertPopup";

function AboutForm({
  handleSave,
  birthday: birthdayInitial,
  location: locationInitial,
}) {
  const [birthday, setBirthday] = useState({
    value: birthdayInitial || "",
    errorMessage: false,
  });
  const [location, setLocation] = useState({
    value: locationInitial || "",
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
          <SlIcon name="info-circle-fill" />
          <h2 className="font-bold">ABOUT : </h2>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-lg font-bold" htmlFor="location">
            LOCATION :
          </label>
          <input
            className="form-input"
            type="text"
            id="location"
            name="location"
            placeholder="Country,City"
            value={location.value}
            onChange={(e) =>
              setLocation(() => ({
                errorMessage: false,
                value: e.target.value,
              }))
            }
          />
          {location.errorMessage && (
            <ErrorText content={location.errorMessage} />
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-lg font-bold" htmlFor="birthday">
            BIRTH DAY :
          </label>
          <input
            className="form-input"
            type="date"
            id="birthday"
            name="birthday"
            value={birthday.value}
            placeholder="Select your birthday"
            onChange={(e) =>
              setBirthday(() => ({
                errorMessage: false,
                value: e.target.value,
              }))
            }
          />
          {birthday.errorMessage && (
            <ErrorText content={birthday.errorMessage} />
          )}
        </div>
        <button
          className="btn"
          onClick={handleSave({
            birthday,
            setBirthday,
            location,
            setLocation,
            setShowAlert,
          })}
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

export default AboutForm;
