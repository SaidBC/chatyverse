import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import checkErrors from "../../../utils/checkErrors";
import validateForm from "../../../utils/validateForm";
import useAppContext from "../../../hooks/useAppContext";
import Button from "../../../components/Buttons/Button";
import FormInput from "../../../components/Inputs/FormInput";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
function Login() {
  const navigate = useNavigate();
  const { setToken } = useAppContext();
  const [username, setUsername] = useState({ value: "", errorMessage: "" });
  const [password, setPassword] = useState({ value: "", errorMessage: "" });
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
    setToken(token);
    navigate("/profile");
  };
  return (
    <div className="bg-gray-900 p-8 rounded-lg w-full max-w-[31.25rem] shadow-2xl">
      <form className="flex flex-col gap-3" action="">
        <h1 className="text-3xl font-extrabold tracking-widest">LOGIN</h1>
        <FormInput
          label={"Username :"}
          value={username.value}
          setInput={setUsername}
          type="text"
          name="username"
          placeholder="Enter your username"
          errorMessage={username.errorMessage}
        />
        <FormInput
          label={"Password :"}
          value={password.value}
          setInput={setPassword}
          type="password"
          name="password"
          placeholder="Enter your password"
          errorMessage={password.errorMessage}
        />
        <Button onClick={loginHandle}>Login</Button>
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
