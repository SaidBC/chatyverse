import { Outlet } from "react-router-dom";
import Nav from "./Nav";
import useAppContext from "../../hooks/useAppContext";

function Profile() {
  const { user, isConnected } = useAppContext();
  if (!isConnected) return <>Connecting ...</>;
  return (
    <div className="flex min-h-[100dvh]">
      <Nav />
      <main className="w-full flex justify-center items-start">
        <Outlet context={{ user }} />
      </main>
    </div>
  );
}
export default Profile;
