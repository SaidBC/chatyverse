import { SlIcon } from "@shoelace-style/shoelace/dist/react";

function SearchBox() {
  return (
    <div>
      <form action="" className="relative">
        <input
          className="form-input rounded-2xl pl-10 "
          type="search"
          name=""
          id=""
          placeholder=""
        />
        <div className="absolute top-3.5  left-4 text-lg">
          <SlIcon name="search" />
        </div>
      </form>
    </div>
  );
}
export default SearchBox;
