import useAuthContext from "../../../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import IconicButton from "../../../components/Buttons/IconicButton";
import Api from "../../../api";
import { useState } from "react";

function LogoutBtn() {
  const { token, setToken } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const logoutHandle = function () {
    Api.logout(token, setToken, setLoading, navigate);
  };
  return (
    <IconicButton
      type="shoelace"
      onClick={logoutHandle}
      className="bg-red-500 hover:bg-red-600 px-8"
      name="box-arrow-left"
    >
      {loading ? "Logging out..." : "Logout"}
    </IconicButton>
  );
}

export default LogoutBtn;
