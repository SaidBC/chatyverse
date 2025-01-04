import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import checkErrors from "../../../utils/checkErrors";
import validateForm from "../../../utils/validateForm";
import ErrorText from "../../../utils/ErrorText";
import useAppContext from "../../../hooks/useAppContext";

const SERVER_URL = "http://localhost:8000/api/v1";
function Login() {
  const navigate = useNavigate();
  const { setUser } = useAppContext();
  const [username, setUsername] = useState({ value: "", errorMessage: false });
  const [password, setPassword] = useState({ value: "", errorMessage: false });
  const loginHandle = async function (e) {
    e.preventDefault();
    const form = {
      username,
      password,
      setPassword,
      setUsername,
    };
    const errors = validateForm(form);
    if (errors.length) return checkErrors(errors, form);

    const res = await fetch(SERVER_URL + "/auth/login", {
      method: "POST",
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
      headers: {
        "content-type": "application/json",
      },
    });
    if (res.status === 404) {
      return setUsername((prev) => ({
        ...prev,
        errorMessage: "User not found",
      }));
    }
    if (res.status === 400) {
      const { errors } = (await res.json()).error;
      return checkErrors(errors, form);
    }
    const token = (await res.json()).data;
    setUser(token);
    navigate("/profile");
  };
  return (
    <div className="bg-gray-900 p-8 rounded-lg w-full max-w-[31.25rem] shadow-2xl">
      <form className="flex flex-col gap-3" action="">
        <h1 className="text-3xl font-extrabold tracking-widest">LOGIN</h1>
        <div className="flex flex-col gap-2">
          <label className="text-lg font-bold" htmlFor="username">
            Username :
          </label>
          <input
            data-testid="username"
            value={username.value}
            onChange={(e) =>
              setUsername((prev) => ({
                errorMessage: false,
                value: e.target.value,
              }))
            }
            className="form-input"
            type="text"
            name="username"
            id="username"
            placeholder="Enter your username"
          />
          {username.errorMessage && (
            <ErrorText content={username.errorMessage} />
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-lg font-bold" htmlFor="password">
            Password :
          </label>
          <input
            data-testid="password"
            value={password.value}
            onChange={(e) =>
              setPassword((prev) => ({
                errorMessage: false,
                value: e.target.value,
              }))
            }
            className="form-input"
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
          />
          {password.errorMessage && (
            <ErrorText content={password.errorMessage} />
          )}
        </div>
        <button className="btn" onClick={loginHandle}>
          Login
        </button>
        <p>
          Dont have an account ? &nbsp;
          <Link
            className="text-indigo-400 hover:text-indigo-500"
            to="../signup"
          >
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
