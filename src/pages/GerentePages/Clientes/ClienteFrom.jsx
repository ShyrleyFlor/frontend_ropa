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
import { useCliente } from "../../../context/ClienteContext";

const ClienteFrom = ({ ButtonTitle, id, startIcon }) => {
  const { getCliente, createCliente, updateCliente } = useCliente();
  const [valuee, setValue] = useState({
    nombre: "",
    telefono: "",
    descripcion: "",
    monto_total: "",
    deuda: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValue({ ...valuee, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (id) {
      await updateCliente(id, valuee);
    } else {
      await createCliente(valuee);
    }
    setValue({
      nombre: "",
      telefono: "",
      descripcion: "",
      monto_total: "",
      deuda: "",
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
    const loadCliente = async () => {
      if (id) {
          const Item = await getCliente(id);
        //   console.log(Item.nombre);
        setValue({
          nombre: Item.nombre,
          telefono: Item.telefono,
          descripcion: Item.descripcion,
          monto_total: Item.monto_total,
          deuda: Item.deuda,
        });
      }
    };
    loadCliente();
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
          <DialogTitle>Clientes</DialogTitle>
          <DialogContent>
            <Stack spacing={2} width="100%">
              <TextField
                style={{ marginTop: "10px" }}
                value={valuee.nombre}
                required
                name="nombre"
                onChange={handleInputChange}
                label="Nombre"
              />
              <TextField
                value={valuee.telefono}
                // type="number"
                onChange={handleInputChange}
                label="Telefono"
                name="telefono"
              />
              <TextField
                value={valuee.descripcion}
                onChange={handleInputChange}
                required
                label="Descripción"
                name="descripcion"
              />
              <TextField
                value={valuee.monto_total}
                type="number"
                onChange={handleInputChange}
                label="Monto de Deuda"
                name="monto_total"
              />
              <TextField
                value={valuee.deuda}
                type="number"
                onChange={handleInputChange}
                label="Monto Pendiente"
                name="deuda"
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

export default ClienteFrom;
