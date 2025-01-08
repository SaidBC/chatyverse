import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import SearchBox from "./SearchBox";
import { SlIcon } from "@shoelace-style/shoelace/dist/react";
import ChatBoxes from "./ChatBoxes";
import { useState } from "react";

function NavBar({ userId }) {
  const [search, setSearch] = useState({ isSearching: false, results: [] });
  return (
    <nav className="fixed md:static md:w-auto md:h-[100dvh] flex h-full items-center flex-col bg-gray-900 px-6 pt-8 gap-8 w-full">
      <h1 className=" block  text-4xl md:text-3xl lg:text-4xl font-lemon">
        CHATYVERSE
      </h1>
      <SearchBox setSearch={setSearch} />
      <ChatBoxes
        userId={userId}
        isSearching={search.isSearching}
        results={search.results}
      />
      <div className="w-full mt-auto mb-8">
        <Link
          className="flex items-center  gap-4 text-lg hover:bg-white/10 pl-8 py-2 rounded-md"
          to="/profile"
        >
          <SlIcon name="person-bounding-box" />
          <span>My Profile</span>
        </Link>
      </div>
    </nav>
  );
}

NavBar.propTypes = {
  userId: PropTypes.number.isRequired,
};

export default NavBar;
