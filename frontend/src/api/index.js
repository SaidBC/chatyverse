import axios from "axios";
import checkErrors from "../utils/checkErrors";
import validateForm from "../utils/validateForm";

const SERVER_API_URL = import.meta.env.VITE_SERVER_API_URL;
axios.defaults.baseURL = SERVER_API_URL;

class Api {
  static #preAuth(form) {
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

  static async login(form, setToken, setLoading) {
    setLoading(true);
    const preResult = this.#preAuth(form);
    if (!preResult) {
      setLoading(false);
      return false;
    }

    const { body, configs } = preResult;
    try {
      const res = await axios.post("/auth/login", body, configs);
      if (res.data.success) {
        setToken(res.data.data);
        return true;
      }
      return false;
    } catch (error) {
      if (error.response?.status === 400) {
        const { errors } = error.response.data.error;
        return checkErrors(errors, form);
      }
      if (error.response?.status === 404) {
        form.setUsername((prev) => ({
          ...prev,
          errorMessage: "User not found",
        }));
        return false;
      }
      console.error("Login error:", error);
      return false;
    } finally {
      setLoading(false);
    }
  }

  static async signup(form, setToken, setLoading) {
    setLoading(true);
    const preResult = this.#preAuth(form);
    if (!preResult) {
      setLoading(false);
      return false;
    }

    const { body, configs } = preResult;
    try {
      const res = await axios.post("/auth/signup", body, configs);
      if (res.data.success) {
        setToken(res.data.data);
        return true;
      }
      return false;
    } catch (error) {
      if (error.response?.status === 400) {
        const { errors } = error.response.data.error;
        return checkErrors(errors, form);
      }
      console.error("Signup error:", error);
      return false;
    } finally {
      setLoading(false);
    }
  }

  static #preSave(form, token) {
    const errors = validateForm(form);
    if (errors.length) {
      checkErrors(errors, form);
      return false;
    }

    const body = Object.entries(form)
      .filter(([key]) => !key.startsWith("set"))
      .reduce((acc, [key, field]) => {
        acc[key] = field?.value;
        return acc;
      }, {});

    const configs = {
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };

    return { body, configs };
  }

  static #createAlert(title, content, variant) {
    return {
      isPopped: true,
      title,
      content,
      variant,
    };
  }

  static async saveProfile(form, userId, token, setShowAlert, setLoading) {
    setLoading(true);
    const preResult = this.#preSave(form, token);
    if (!preResult) {
      setLoading(false);
      return false;
    }

    const { body, configs } = preResult;
    try {
      const res = await axios.patch(`/users/${userId}`, body, configs);
      if (res.data.success) {
        setShowAlert(
          this.#createAlert(
            "Success",
            "Settings were changed successfully",
            "success"
          )
        );
        return true;
      }
      setShowAlert(
        this.#createAlert(
          "Failed",
          "Settings were not changed. Please try again.",
          "error"
        )
      );
      return false;
    } catch (error) {
      if (error.response?.status === 401) {
        setShowAlert(
          this.#createAlert(
            "Error",
            "Unauthorized. Please log in again.",
            "error"
          )
        );
      } else if (error.response?.status === 400) {
        const { errors } = error.response.data.error;
        return checkErrors(errors, form);
      } else {
        console.error(error);
        setShowAlert(
          this.#createAlert("Error", "An unexpected error occurred", "error")
        );
      }
      return false;
    } finally {
      setLoading(false);
    }
  }
}

export default Api;
