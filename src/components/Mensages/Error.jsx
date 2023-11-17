import { Alert, AlertTitle } from "@mui/material";
import React from "react";

const Error = ({errorTitle="Error",children}) => {
  return (
    <>
      <Alert severity="error" variant="filled">
        <AlertTitle>{errorTitle}</AlertTitle>
        {children}
        {/* This is an error alert — <strong>check it out!</strong> */}
      </Alert>
    </>
  );
};

export default Error;
