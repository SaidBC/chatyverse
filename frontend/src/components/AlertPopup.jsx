import Alert from "@mui/material/Alert";
import { AlertTitle } from "@mui/material";
import { useEffect, useReducer, useState } from "react";

function AlertPopup({ alert: { variant, title, content }, setShowAlert }) {
  useEffect(() => {
    setTimeout(() => setShowAlert(false), 2000);
  }, []);
  return (
    <Alert
      className="fixed top-8 right-8 animate-bounce w-80"
      severity={variant || "success"}
    >
      <AlertTitle>{title}</AlertTitle>
      {content}
    </Alert>
  );
}

export default AlertPopup;
