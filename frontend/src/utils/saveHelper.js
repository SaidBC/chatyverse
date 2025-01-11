import checkErrors from "./checkErrors";
import validateForm from "./validateForm";

const saveHelper = async function (form, userId, setShowAlert) {
  const SERVER_API_URL = import.meta.env.VITE_SERVER_API_URL;
  const errors = validateForm(form);
  if (errors.length) return checkErrors(errors, form);
  for (const key in form) {
    if (key.startsWith("set")) {
      continue;
    }
    form[key] = form[key].value;
  }
  const res = await fetch(SERVER_API_URL + "/users/" + userId, {
    method: "PATCH",
    body: JSON.stringify(form),
    headers: {
      "content-type": "application/json",
    },
  });
  if (res.status === 401) {
    alert("Unauthorized user");
  }
  if (res.status === 400) {
    const { errors } = (await res.json()).error;
    return checkErrors(errors, form);
  }
  const data = await res.json();
  if (data.success)
    setShowAlert({
      isPopped: true,
      title: "Success",
      content: "Settings was changed successfully",
      variant: "success",
    });
  if (!data.success)
    setShowAlert({
      isPopped: true,
      title: "Failed",
      content: "Settings was not changed try again",
      variant: "error",
    });
};

export default saveHelper;
