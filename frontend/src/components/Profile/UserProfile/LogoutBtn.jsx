import { SlIcon } from "@shoelace-style/shoelace/dist/react";
import useAppContext from "../../../hooks/useAppContext";
import { useNavigate } from "react-router-dom";

function LogoutBtn() {
  const { setUser } = useAppContext();
  const navigate = useNavigate();
  const logoutHandle = function () {
    setUser(null);
    navigate("/auth/login");
  };
  return (
    <button
      className="btn bg-red-500 hover:bg-red-600 px-8 gap-2"
      onClick={logoutHandle}
    >
      <SlIcon name="box-arrow-left" />
      <span>Logout</span>
    </button>
  );
}

export default LogoutBtn;
