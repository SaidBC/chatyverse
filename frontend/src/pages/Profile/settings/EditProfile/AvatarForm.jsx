import PropTypes from "prop-types";
import { SlIcon } from "@shoelace-style/shoelace/dist/react";
import { useRef, useState } from "react";
import AlertPopup from "../../../../components/AlertPopup";
import Button from "../../../../components/Buttons/Button";
import axios from "axios";
import AvatarImage from "../../../../components/AvatarImage";

const SERVER_URL = import.meta.env.VITE_SERVER_API_URL;

function AvatarForm({ profilePicture, userId, token }) {
  const [showAlert, setShowAlert] = useState({
    isPopped: false,
    title: "",
    content: "",
    variant: "",
  });
  const [file, setFile] = useState(null);
  const handleUpload = function (e) {
    e.preventDefault();
    if (!file)
      return setShowAlert({
        isPopped: true,
        title: "Failed",
        variant: "error",
        content: "Please select a image",
      });
    if (!file.type.startsWith("image")) {
      return setShowAlert({
        isPopped: true,
        title: "Failed",
        variant: "error",
        content: "Uploaded file should be a image",
      });
    }
    const data = new FormData();
    data.set("avatar", file);

    axios
      .post(SERVER_URL + "/users/" + userId + "/upload", data, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        if (res.status !== 200)
          return setShowAlert({
            isPopped: true,
            title: "Failed",
            variant: "error",
            content: "Internal Server Error",
          });
        if (!res.data.success)
          return setShowAlert({
            isPopped: true,
            title: "Failed",
            variant: "error",
            content: res.data.error.message,
          });
        setShowAlert({
          isPopped: true,
          title: "Failed",
          variant: "success",
          content: res.data.data,
        });
      })
      .catch((err) => {
        setShowAlert({
          isPopped: true,
          title: "Failed",
          variant: "error",
          content: err.message,
        });
      });
  };
  const imgRef = useRef(null);
  const handleSelectingFile = function (e) {
    const file = e.target.files[0];
    if (!file) return;
    setFile(file);
    if (!file.type.startsWith("image")) return;
    const reader = new FileReader();
    reader.onload = function (e) {
      imgRef.current.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };
  return (
    <>
      <form className="flex flex-col gap-4" method="post">
        <div className="flex items-center gap-4 text-2xl">
          <SlIcon name="person-square" />
          <h2 className="font-bold">AVATAR : </h2>
        </div>
        <div className="flex flex-col gap-1">
          <AvatarImage
            ref={imgRef}
            src={profilePicture}
            className="relative w-32 h-32 bg-gray-950 rounded-full"
            alt="profile image"
          />
          <div className="flex">
            <input
              type="file"
              onChange={handleSelectingFile}
              name="avatar"
              id="avatar"
              multiple={false}
            />
            <Button className="px-6" onClick={handleUpload}>
              UPLOAD
            </Button>
          </div>
        </div>
      </form>
      {showAlert.isPopped && (
        <AlertPopup alert={showAlert} setShowAlert={setShowAlert} />
      )}
    </>
  );
}

AvatarForm.propTypes = {
  profilePicture: PropTypes.string.isRequired,
  userId: PropTypes.number.isRequired,
  token: PropTypes.any,
};

export default AvatarForm;
