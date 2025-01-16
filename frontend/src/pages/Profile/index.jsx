import { Outlet } from "react-router-dom";
import Nav from "./Nav";
import useAuthContext from "../../hooks/useAuthContext";
import Wrapper from "../../components/Wrapper";

function Profile() {
  const { user, isConnected } = useAuthContext();
  if (!isConnected)
    return <Wrapper className="font-bold text-4xl">Connecting ...</Wrapper>;
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
