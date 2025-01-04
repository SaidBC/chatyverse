import { Outlet, useLocation } from "react-router-dom";
import NavBar from "./NavBar";
import { useEffect, useState } from "react";
import useAppContext from "../../hooks/useAppContext";
import useDecodeToken from "../../hooks/useDecodeToken";
import useConnnectUser from "../../hooks/useConnectUser";

function Chat() {
  const connection = useConnnectUser();
  const location = useLocation();
  const [showNav, setShowNav] = useState(true);
  const { user: token } = useAppContext();
  const decodedUser = useDecodeToken(token);
  useEffect(() => {
    if (location.pathname.split("/")[2] && window.innerWidth < 768)
      setShowNav(false);
    else setShowNav(true);
    const checkSize = () => {
      if (location.pathname.split("/")[2] && window.innerWidth < 768)
        setShowNav(false);
      else setShowNav(true);
    };
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, [location]);
  return (
    <div className="flex min-h-[100dvh]">
      {showNav && <NavBar userId={decodedUser.current.id} />}
      <main className="w-full flex justify-center items-start">
        <Outlet context={{ showNav, token, userId: decodedUser.current.id }} />
      </main>
    </div>
  );
}

export default Chat;
