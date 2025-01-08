import PropTypes from "prop-types";
import { SlIcon } from "@shoelace-style/shoelace/dist/react";
import { useState } from "react";
import ErrorText from "../../../../components/ErrorText";
import AlertPopup from "../../../../components/AlertPopup";
import Button from "../../../../components/Buttons/Button";

function BioForm({ handleSave, bio: bioInitial }) {
  const [bio, setBio] = useState({
    value: bioInitial || "",
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
          <SlIcon name="pen-fill" />
          <h2 className="font-bold">BIO : </h2>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-lg font-bold" htmlFor="email">
            Content :
          </label>
          <textarea
            className="form-input max-h-40"
            id="bio"
            name="bio"
            value={bio.value}
            placeholder="Enter your new bio"
            onChange={(e) =>
              setBio(() => ({ errorMessage: false, value: e.target.value }))
            }
          ></textarea>
          {bio.errorMessage && <ErrorText content={bio.errorMessage} />}
        </div>
        <Button onClick={handleSave({ bio, setBio, setShowAlert })}>
          SAVE
        </Button>
      </form>
      {showAlert.isPopped && (
        <AlertPopup alert={showAlert} setShowAlert={setShowAlert} />
      )}
    </>
  );
}

BioForm.propTypes = {
  handleSave: PropTypes.func.isRequired,
  bio: PropTypes.string.isRequired,
};

export default BioForm;
