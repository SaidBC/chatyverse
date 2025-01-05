import { NavLink, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();
  return (
    <header className="flex items-center  justify-between py-8 px-4 sm:px-6 lg:px-8 ">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-lemon">
        CHATYVERSE
      </h1>
      <nav>
        <ul className="flex gap-4">
          <li>
            <NavLink
              className={
                "font-bold  p-3 text-lg hover:bg-white/10 rounded-md" +
                (location.pathname === "/auth/login" ? " text-indigo-500" : "")
              }
              to="./login"
            >
              LOGIN
            </NavLink>
          </li>
          <li>
            <NavLink
              className={
                "font-bold p-3 text-lg hover:bg-white/10 rounded-md" +
                (location.pathname === "/auth/signup" ? " text-indigo-500" : "")
              }
              to="./signup"
            >
              SIGNUP
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
export default Header;
