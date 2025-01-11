import { Link } from "react-router-dom";
import NotFoundError from "./NotFoundError";

function PageNotFoundError() {
  return (
    <NotFoundError label={"Page not found"}>
      <div>
        <span className="text-xl">
          Go visit{" "}
          <Link
            className="text-indigo-500 hover:text-indigo-600"
            to="auth/login"
          >
            Login{" "}
          </Link>
          or{" "}
          <Link className="text-indigo-500 hover:text-indigo-600" to="profile">
            Profile
          </Link>
        </span>
      </div>
    </NotFoundError>
  );
}

export default PageNotFoundError;
