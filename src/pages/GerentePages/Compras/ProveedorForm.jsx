import {
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  Stack,
  DialogActions,
} from "@mui/material";
import Button from "../../../components/buttons/Button";

import SaveIcon from "@mui/icons-material/Save";
import { useEffect, useState } from "react";
import { useProveedor } from "../../../context/ProveedoresContext";

const ProveedorForm = ({ ButtonTitle, id, startIcon }) => {
  const { getProveedor, createProveedor, updateProveedor } = useProveedor();
  const [valuee, setValue] = useState({
    nombre: "",
    telefono: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValue({ ...valuee, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (id) {
      await updateProveedor(id, valuee);
    } else {
      await createProveedor(valuee);
    }
    setValue({
      nombre: "",
      telefono: "",
    });
  };
  //-----------------------------------------------------------
  //Control de ventana

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  //-----------------------------------------------------------
  //Carga de opciones para editar

  useEffect(() => {
    const loadCategoria = async () => {
      if (id) {
        const Item = await getProveedor(id);
        setValue({
          nombre: Item.nombre,
          telefono: Item.telefono,
        });
      }
    };
    loadCategoria();
  }, [open]);

  return (
    <>
      <Button startIcon={startIcon} handleClick={handleClickOpen}>
        {ButtonTitle}
      </Button>
      <Dialog
        style={{}}
        sx={{ bannerColor: "#2F528F" }}
        fullWidth
        maxWidth={"xs"} 
        open={open}
        onClose={handleClose}
      >
        <form onSubmit={handleSubmit}>
          <DialogTitle>Proveedor</DialogTitle>
          <DialogContent>
            <Stack spacing={2} width="100%">
              <TextField
                style={{ marginTop: "10px" }}
                value={valuee.nombre}
                required
                name="nombre"
                onChange={handleInputChange}
                label="Proveedor"
              />
              <TextField
              value={valuee.telefono}
                type="number"
                onChange={handleInputChange}
                label="Telefono"
                name="telefono"
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button color="error" text={"Salir"} handleClick={handleClose} />
            <Button
            color="success"
              text={"Guardar"}
              type={"submit"}
              handleClick={handleClose}
              startIcon={<SaveIcon />}
            />
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default ProveedorForm;
