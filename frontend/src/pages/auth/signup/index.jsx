import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import validateForm from "../../../utils/validateForm";
import checkErrors from "../../../utils/checkErrors";
import useAuthContext from "../../../hooks/useAuthContext";
import FormInput from "../../../components/Inputs/FormInput";
import Button from "../../../components/Buttons/Button";
import AuthApi from "../AuthApi";
const SERVER_API_URL = import.meta.env.VITE_SERVER_API_URL;

function Signup() {
  const navigate = useNavigate();
  const { setToken } = useAuthContext();
  const [email, setEmail] = useState({ value: "", errorMessage: "" });
  const [username, setUsername] = useState({ value: "", errorMessage: "" });
  const [confirmPassword, setConfirmPassword] = useState({
    value: "",
    errorMessage: "",
  });
  const [password, setPassword] = useState({ value: "", errorMessage: "" });

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
    AuthApi.signup(form, setToken);
  };

  return (
    <div className="bg-gray-900 p-8 rounded-lg w-full max-w-[31.25rem] shadow-2xl ">
      <form className="flex flex-col gap-3" action="">
        <h1 className="text-3xl font-extrabold tracking-widest">SIGN UP</h1>

        <FormInput
          label="Email :"
          type="text"
          name="email"
          placeholder="Enter your email"
          value={email.value}
          setInput={setEmail}
          errorMessage={email.errorMessage}
        />
        <FormInput
          label="Username :"
          type="text"
          name="username"
          placeholder="Enter your username"
          value={username.value}
          setInput={setUsername}
          errorMessage={username.errorMessage}
        />
        <FormInput
          label="Password :"
          type="password"
          name="password"
          placeholder="Enter your password"
          value={password.value}
          setInput={setPassword}
          errorMessage={password.errorMessage}
        />

        <FormInput
          label="Confirm Password :"
          type="password"
          name="confirm-password"
          placeholder="Confirm your password"
          value={confirmPassword.value}
          setInput={setConfirmPassword}
          errorMessage={confirmPassword.errorMessage}
        />
        <Button onClick={signupHandle}>Sign up</Button>
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
