import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import validateForm from "../../../utils/validateForm";
import checkErrors from "../../../utils/checkErrors";
import useAppContext from "../../../hooks/useAppContext";
import FormInput from "../../../components/Inputs/FormInput";
import Button from "../../../components/Buttons/Button";
const SERVER_URL = "http://localhost:8000/api/v1";

function Signup() {
  const navigate = useNavigate();
  const { setToken } = useAppContext();
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
    setToken(token);
    navigate("/profile");
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
