import { Alert, AlertTitle } from "@mui/material";

function Progress({ precentage }) {
  const isComplated = precentage === "100.00";
  if (isComplated)
    return (
      <>
        <Alert
          className="overflow-hidden fixed top-8 right-8  w-80"
          severity="success"
        >
          <AlertTitle>Upload Complated</AlertTitle>
          <span>{precentage}% , Please wait ...</span>
          <span className="absolute bottom-0 left-0 h-1 w-full"></span>
        </Alert>
      </>
    );
  if (!isComplated)
    return (
      <>
        <Alert
          className="overflow-hidden fixed top-8 right-8  w-80"
          severity="info"
        >
          <AlertTitle>Upload progress :</AlertTitle>
          <span>{precentage}%</span>
          <span
            style={{
              width: precentage + "%",
            }}
            className="absolute bottom-0 left-0 h-1 bg-[#0288d1]"
          ></span>
        </Alert>
      </>
    );
}

export default Progress;
