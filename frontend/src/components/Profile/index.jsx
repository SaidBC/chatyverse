import { Outlet } from "react-router-dom";
import Nav from "./Nav";
import useDecodeToken from "../../hooks/useDecodeToken";
import useAppContext from "../../hooks/useAppContext";

function Profile() {
  const { user: token } = useAppContext();
  const decodedUser = useDecodeToken(token);
  return (
    <div className="flex min-h-[100dvh]">
      <Nav />
      <main className="w-full flex justify-center items-start">
        <Outlet context={{ decodedUser }} />
      </main>
    </div>
  );
}
export default Profile;
