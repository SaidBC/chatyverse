import { Link, useNavigate } from "react-router-dom";
import ErrorText from "../../../utils/ErrorText";
import { useState } from "react";
import validateForm from "../../../utils/validateForm";
import checkErrors from "../../../utils/checkErrors";
import useAppContext from "../../../hooks/useAppContext";
const SERVER_URL = "http://localhost:8000/api/v1";

function Signup() {
  const navigate = useNavigate();
  const { setUser } = useAppContext();
  const [email, setEmail] = useState({ value: "", errorMessage: false });
  const [username, setUsername] = useState({ value: "", errorMessage: false });
  const [confirmPassword, setConfirmPassword] = useState({
    value: "",
    errorMessage: false,
  });
  const [password, setPassword] = useState({ value: "", errorMessage: false });
  const signupHandle = async function (e) {
    e.preventDefault();
    const form = {
      email,
      username,
      password,
      confirmPassword,
      setConfirmPassword,
      setEmail,
      setPassword,
      setUsername,
    };
    const errors = validateForm(form);
    checkErrors(errors, form);
    if (errors.length) return checkErrors(errors, form);
    const res = await fetch(SERVER_URL + "/auth/signup", {
      method: "POST",
      body: JSON.stringify({
        email: email.value,
        username: username.value,
        password: password.value,
      }),
      headers: {
        "content-type": "application/json",
      },
    });
    if (res.status === 400) {
      const { errors } = (await res.json()).error;
      return checkErrors(errors, form);
    }
    const token = (await res.json()).data;
    setUser(token);
    navigate("/profile");
  };
  return (
    <div className="bg-gray-900 p-8 rounded-lg w-full max-w-[31.25rem] shadow-2xl ">
      <form className="flex flex-col gap-3" action="">
        <h1 className="text-3xl font-extrabold tracking-widest">SIGN UP</h1>
        <div className="flex flex-col gap-2">
          <label className="text-lg font-bold" htmlFor="email">
            Email :
          </label>
          <input
            data-testid="email"
            value={email.value}
            onChange={(e) =>
              setEmail((prev) => ({
                errorMessage: false,
                value: e.target.value,
              }))
            }
            className="form-input"
            type="text"
            name="email"
            id="email"
            placeholder="Enter your email"
          />
          {email.errorMessage && <ErrorText content={email.errorMessage} />}
        </div>

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
        <div className="flex flex-col gap-2">
          <label className="text-lg font-bold" htmlFor="confirm-password">
            Confirm Password :
          </label>
          <input
            data-testid="confirm-password"
            value={confirmPassword.value}
            onChange={(e) =>
              setConfirmPassword((prev) => ({
                errorMessage: false,
                value: e.target.value,
              }))
            }
            className="form-input"
            type="password"
            name="confirm-password"
            id="confirm-password"
            placeholder="Confirm your password"
          />
          {confirmPassword.errorMessage && (
            <ErrorText content={confirmPassword.errorMessage} />
          )}
        </div>
        <button className="btn" onClick={signupHandle}>
          Sign up
        </button>
        <p>
          Already have an account ? &nbsp;
          <Link className="text-indigo-400 hover:text-indigo-500" to="../login">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
