import PropTypes from "prop-types";
import { SlIcon } from "@shoelace-style/shoelace/dist/react";
import axios from "axios";
import { useState } from "react";
const SERVER_API_URL = import.meta.env.VITE_SERVER_API_URL;
function SearchBox({ setSearch }) {
  const [input, setInput] = useState("");
  const handleSearch = async (e) => {
    if (e.target.value.length > 0) {
      axios
        .get(SERVER_API_URL + "/users?username=" + e.target.value)
        .then((res) => {
          if (res.status !== 200)
            return alert("Error while searching for users");
          if (!res.data.success)
            return alert("Error while searching for users");
          setSearch({ isSearching: true, results: res.data.data });
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      setSearch({ isSearching: false, results: [] });
    }
    setInput(e.target.value);
  };
  return (
    <div>
      <form action="" className="relative">
        <input
          className="form-input rounded-2xl pl-10 "
          type="search"
          name="username"
          id="q-username"
          placeholder="Search for a new friend "
          onChange={handleSearch}
          value={input}
        />
        <div className="absolute top-3.5  left-4 text-lg">
          <SlIcon name="search" />
        </div>
      </form>
    </div>
  );
}

SearchBox.propTypes = {
  setSearch: PropTypes.func.isRequired,
};

export default SearchBox;
