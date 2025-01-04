const EMAIL_REGEX = new RegExp(
  /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/
);
const validateForm = function (form) {
  const errors = [];

  if (form.email != undefined) {
    if (form.email.value === "") {
      errors.push({
        path: "email",
        msg: "Please enter your email",
      });
    }
    if (!EMAIL_REGEX.test(form.email.value))
      errors.push({
        path: "email",
        msg: "Invalid email pattern",
      });
  }

  if (form.newEmail != undefined) {
    if (form.newEmail.value === "") {
      errors.push({
        path: "new-email",
        msg: "Please enter your new email",
      });
    }
    if (!EMAIL_REGEX.test(form.newEmail.value)) {
      errors.push({
        path: "new-email",
        msg: "Invalid new email pattern",
      });
    }
  }

  if (form.username != undefined) {
    if (form.username.value === "") {
      errors.push({
        path: "username",
        msg: "Please enter your username",
      });
    }
  }

  if (form.password != undefined) {
    if (form.password.value === "") {
      errors.push({
        path: "password",
        msg: "Please enter your password",
      });
    }
  }

  if (form.location != undefined) {
    if (form.location.value === "") {
      errors.push({
        path: "location",
        msg: "Please enter your location",
      });
    }
  }
  if (form.birthday != undefined) {
    if (form.birthday.value === "") {
      errors.push({
        path: "birthday",
        msg: "Please select your birthday",
      });
    }
  }
  if (form.bio != undefined) {
    if (form.bio.value === "") {
      errors.push({
        path: "bio",
        msg: "Please enter your bio",
      });
    }
  }
  if (form.confirmPassword != undefined) {
    if (form.confirmPassword.value === "") {
      errors.push({
        path: "confirm-password",
        msg: "Please confirm password that's you wrote",
      });
    }
    if (form.confirmPassword.value !== form.password.value) {
      errors.push({
        path: "confirm-password",
        msg: "Confirm must be equal to password",
      });
    }
  }

  if (form.newPassword != undefined) {
    if (form.newPassword.value === "") {
      errors.push({
        path: "new-password",
        msg: "Please enter your new password",
      });
    }
  }

  if (form.confirmNewPassword != undefined) {
    if (form.confirmNewPassword.value === "") {
      errors.push({
        path: "confirm-new-password",
        msg: "Please confirm password that's you wrote",
      });
    }
    if (form.confirmNewPassword.value !== form.newPassword.value) {
      errors.push({
        path: "confirm-new-password",
        msg: "Confirm must be equal to new password",
      });
    }
  }

  return errors;
};
export default validateForm;
