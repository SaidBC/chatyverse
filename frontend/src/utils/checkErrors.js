function checkErrors(errors, form) {
  for (const key in form) {
    errors.forEach((error) => {
      if (
        error.path === key ||
        (error.path === "confirm-password" && key === "confirmPassword") ||
        (error.path === "new-password" && key === "newPassword") ||
        (error.path === "new-email" && key === "newEmail") ||
        (error.path === "confirm-new-password" && key === "confirmNewPassword")
      ) {
        form["set" + key[0].toUpperCase() + key.slice(1)]((prev) => {
          if (prev.errorMessage === false) {
            return { ...prev, errorMessage: error.msg };
          }
          return prev;
        });
      }
    });
  }
}

export default checkErrors;
