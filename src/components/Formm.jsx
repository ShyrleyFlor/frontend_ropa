import * as React from "react";

import { TextField, Stack, Box } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "./buttons/Button";
import SaveIcon from "@mui/icons-material/Save";
const Formm = ({ Title, children,  }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button handleClick={handleClickOpen}>Agregar</Button>

      <Dialog
        style={{}}
        sx={{ bannerColor: "#2F528F" }}
        fullWidth
        maxWidth={"xs"} // Puedes utilizar 'xs', 'sm', 'md', 'lg', 'xl' o un número en píxeles
        //    maxHeight={500}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>{Title}</DialogTitle>
        <DialogContent>
          <Stack spacing={2} width="100%">
            {children}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button color="error" text={"Salir"} handleClick={handleClose} />
          <Button
          color="success"
            text={"Guardar"}
            type="submit"
            startIcon={<SaveIcon />}

            // handleClick={() => navigate("/home")}
          />
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Formm;
