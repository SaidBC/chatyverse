import { Outlet, useLocation } from "react-router-dom";
import NavBar from "./NavBar";
import { useEffect, useState } from "react";
import useAppContext from "../../hooks/useAppContext";

function Chat() {
  const location = useLocation();
  const [showNav, setShowNav] = useState(true);
  const { token, user, isConnected } = useAppContext();
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
  if (!isConnected) return <>Connecting ...</>;
  return (
    <div className="flex min-h-[100dvh]">
      {showNav && <NavBar userId={user.id} />}
      <main className="w-full flex justify-center items-start">
        <Outlet context={{ showNav, token, userId: user.id }} />
      </main>
    </div>
  );
}

export default Chat;
