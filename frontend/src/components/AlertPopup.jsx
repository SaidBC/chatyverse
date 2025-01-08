import Alert from "@mui/material/Alert";
import { AlertTitle } from "@mui/material";
import { useEffect } from "react";
import PropTypes from "prop-types";

function AlertPopup({ alert: { variant, title, content }, setShowAlert }) {
  useEffect(() => {
    setTimeout(() => setShowAlert(false), 2000);
  }, [setShowAlert]);
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

AlertPopup.propTypes = {
  alert: PropTypes.shape({
    variant: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
  }).isRequired,
  setShowAlert: PropTypes.func.isRequired,
};

export default AlertPopup;
