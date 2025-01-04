import { Link, useLocation } from "react-router-dom";
import { SlIcon } from "@shoelace-style/shoelace/dist/react";
import { useEffect, useState } from "react";

const showNavStyle = " flex fixed h-full border-r-2 border-white";
function Nav() {
  const { pathname } = useLocation();
  const [showNav, setShowNav] = useState(false);
  const handleNavbar = function () {
    setShowNav(!showNav);
  };
  useEffect(() => {}, []);

  return (
    <>
      <div className="fixed top-4 right-2 text-white text-4xl bg-gray-700 w-16 h-16 flex justify-center items-center rounded-full sm:hidden shadow-2xl ">
        <button
          onClick={handleNavbar}
          className="absolute inset-0 rounded-full hover:bg-white/10 cursor-pointer"
        >
          <SlIcon name="list" />
        </button>
      </div>
      <nav
        className={
          " sm:flex flex-col bg-gray-900 px-6 pt-8 gap-8" +
          (showNav ? showNavStyle : " hidden sm:flex")
        }
      >
        <h1 className="hidden lg:block text-4xl font-lemon">CHATYVERSE</h1>
        <ul className="flex flex-col [&_a_span]:hidden lg:[&_a_span]:flex lg:[&_a]:text-lg [&_a]:text-2xl [&_a]:px-2 lg:[&_a]:pl-8 lg:[&_a]:pr-0">
          <li>
            <Link
              className={
                "flex items-center  gap-4 text-lg hover:bg-white/10 pl-8 py-2 rounded-md" +
                (pathname === "/profile" ? " text-indigo-400" : "")
              }
              to="/profile"
            >
              <SlIcon name="person-bounding-box" />
              <span>My Profile</span>
            </Link>
          </li>
          <li>
            <Link
              className="flex items-center  gap-4 text-lg hover:bg-white/10 pl-8 py-2 rounded-md"
              to="/chat"
            >
              <SlIcon name="chat-dots-fill" />
              <span>Chat</span>
            </Link>
          </li>
          <li>
            <ul>
              <li className=" relative my-2 pt-3">
                <span className="absolute w-full h-[1px] bg-gray-600 top-0"></span>
                <div className="hidden lg:flex items-center gap-2 font-extrabold text-gray-300">
                  <SlIcon name="gear-fill" />
                  <h3>SETTINGS :</h3>
                </div>
              </li>
              <li>
                <Link
                  className={
                    "flex items-center  gap-4 text-lg hover:bg-white/10 pl-8 py-2 rounded-md" +
                    (pathname === "/profile/settings/profile"
                      ? " text-indigo-400"
                      : "")
                  }
                  to="/profile/settings/profile"
                >
                  <SlIcon name="person-fill-gear" />
                  <span>Edit Profile</span>
                </Link>
              </li>
              <li>
                <Link
                  className={
                    "flex items-center  gap-4 text-lg hover:bg-white/10 pl-8 py-2 rounded-md" +
                    (pathname === "/profile/settings/email"
                      ? " text-indigo-400"
                      : "")
                  }
                  to="/profile/settings/email"
                >
                  <SlIcon name="envelope-at-fill" />
                  <span>Change Email</span>
                </Link>
              </li>
              <li>
                <Link
                  className={
                    "flex items-center  gap-4 text-lg hover:bg-white/10 pl-8 py-2 rounded-md" +
                    (pathname === "/profile/settings/password"
                      ? " text-indigo-400"
                      : "")
                  }
                  to="/profile/settings/password"
                >
                  <SlIcon name="shield-lock-fill" />
                  <span>Change Password</span>
                </Link>
              </li>
              <li>
                <Link
                  className={
                    "flex items-center  gap-4 text-lg hover:bg-white/10 pl-8 py-2 rounded-md" +
                    (pathname === "/profile/settings/theme"
                      ? " text-indigo-400"
                      : "")
                  }
                  to="/profile/settings/theme"
                >
                  <SlIcon name="droplet-half" />
                  <span>Theme</span>
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Nav;
