import useAppContext from "../../../hooks/useAppContext";
import { useNavigate } from "react-router-dom";
import IconicButton from "../../../components/Buttons/IconicButton";

function LogoutBtn() {
  const { setToken } = useAppContext();
  const navigate = useNavigate();
  const logoutHandle = function () {
    setToken(null);
    navigate("/auth/login");
  };
  return (
    <IconicButton
      type="shoelace"
      onClick={logoutHandle}
      className="bg-red-500 hover:bg-red-600 px-8"
      name="box-arrow-left"
    >
      Logout
    </IconicButton>
  );
}

export default LogoutBtn;
