import { Alert, Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";

const MesageError = ({ message, setMessage }) => {
  //-------------------------------------------------------------------------
  // Mensajes
  const [open, setOpen] = useState(false);

  // Mensajes de alerta detectar
  useEffect(() => {
    if (message) {
      setOpen(true);
    }
  }, [message]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    setMessage();
  };

  return (
    
    <>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="error"
        //   variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default MesageError;
