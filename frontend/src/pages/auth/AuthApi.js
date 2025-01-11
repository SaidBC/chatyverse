import axios from "axios";
import checkErrors from "../../utils/checkErrors";
import validateForm from "../../utils/validateForm";

const SERVER_API_URL = import.meta.env.VITE_SERVER_API_URL;
axios.defaults.baseURL = SERVER_API_URL;

class AuthApi {
  static #preSubmit(form) {
    const errors = validateForm(form);
    if (errors.length) return checkErrors(errors, form), false;
    const configs = {
      withCredentials: true,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    };
    const body = {
      username: form.username.value,
      password: form.password.value,
    };
    if (form.email !== undefined) body.email = form.email.value;
    return { configs, body };
  }

  static async login(form, setToken) {
    if (!this.#preSubmit(form)) return false;
    const { body, configs } = this.#preSubmit(form);
    try {
      const res = await axios.post("/auth/login", body, configs);
      if (res.data.success) {
        const token = res.data.data;
        setToken(token);
      }
    } catch (error) {
      if (error.status === 400) {
        const { errors } = error.response.data.error;
        return checkErrors(errors, form);
      }
      if (error.status === 404) {
        return form.setUsername((prev) => ({
          ...prev,
          errorMessage: "User not found",
        }));
      }
      console.error(error);
    }
  }

  static async signup(form, setToken) {
    if (!this.#preSubmit(form)) return false;
    const { body, configs } = this.#preSubmit(form);
    try {
      const res = await axios.post("/auth/signup", body, configs);
      if (res.data.success) {
        const token = res.data.data;
        setToken(token);
      }
    } catch (error) {
      if (error.status === 400) {
        const { errors } = error.response.data.error;
        return checkErrors(errors, form);
      }
      console.error(error);
    }
  }
}

export default AuthApi;
