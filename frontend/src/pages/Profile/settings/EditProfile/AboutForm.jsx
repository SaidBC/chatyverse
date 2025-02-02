import PropTypes from "prop-types";
import { SlIcon } from "@shoelace-style/shoelace/dist/react";
import { useState } from "react";
import AlertPopup from "../../../../components/AlertPopup";
import Button from "../../../../components/Buttons/Button";
import FormInput from "../../../../components/Inputs/FormInput";

function AboutForm({
  handleSave,
  birthday: birthdayInitial,
  location: locationInitial,
}) {
  const [loading, setLoading] = useState(false);
  const [birthday, setBirthday] = useState({
    value: birthdayInitial?.slice(0, 10) || "",
    errorMessage: "",
  });
  const [location, setLocation] = useState({
    value: locationInitial || "",
    errorMessage: "",
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
        <FormInput
          label="LOCATION :"
          type="text"
          name="location"
          placeholder="Country,City"
          value={location.value}
          setInput={setLocation}
          errorMessage={location.errorMessage}
        />
        <FormInput
          label="BIRTH DAY :"
          type="date"
          name="birthday"
          value={birthday.value}
          placeholder="Select your birthday"
          setInput={setBirthday}
          errorMessage={birthday.errorMessage}
        />
        <Button
          className="btn"
          onClick={handleSave({
            birthday,
            setBirthday,
            location,
            setLocation,
            setShowAlert,
            setLoading,
          })}
        >
          {loading ? "Saving..." : "SAVE"}
        </Button>
      </form>
      {showAlert.isPopped && (
        <AlertPopup alert={showAlert} setShowAlert={setShowAlert} />
      )}
    </>
  );
}

AboutForm.propTypes = {
  handleSave: PropTypes.func.isRequired,
  birthday: PropTypes.string,
  location: PropTypes.string,
};

export default AboutForm;
