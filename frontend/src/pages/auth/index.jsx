import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
function Auth() {
  return (
    <>
      <Header />
      <main className="min-h-full h-fit flex justify-center items-start pt-8 px-6 pb-10">
        <Outlet />
      </main>
    </>
  );
}

export default Auth;
