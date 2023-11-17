import {
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  Stack,
  DialogActions,
  Typography,
} from "@mui/material";
import Button from "../../../components/buttons/Button";
import SaveIcon from "@mui/icons-material/Save";
import { useEffect, useState } from "react";
import { useCliente } from "../../../context/ClienteContext";

const DeudasForm = ({ ButtonTitle, id, startIcon }) => {
  const { getCliente, createCliente, updateCliente } = useCliente();
  const [valuee, setValue] = useState({
    nombre: "",
    telefono: "",
    descripcion: "",
    monto_total: "",
    deuda: "",
    pago: "",
  });
  const [valuee2, setValue2] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValue({ ...valuee, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setValue2({
      nombre: valuee.nombre,
      telefono: valuee.telefono,
      descripcion: valuee.descripcion,
      monto_total: valuee.monto_total,
      deuda: valuee.deuda - valuee.pago,
    });

    setValue({
      nombre: "",
      telefono: "",
      descripcion: "",
      monto_total: "",
      deuda: "",
      pago: "",
    });
  };
  useEffect(() => {
    const loadCliente = async () => {
      if (valuee2 != "") {
        await updateCliente(id, valuee2);
      }
    };
    loadCliente();
  }, [valuee2]);
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
          pago: "",
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
              <Typography variant="h6" fontWeight="bold">
                Monto Pendiente
              </Typography>
              <Typography variant="h6" fontWeight="bold">
                {valuee.deuda.toLocaleString("es-PY", {
                  style: "currency",
                  currency: "PYG",
                })}
              </Typography>
              <TextField
                value={valuee.pago}
                type="number"
                onChange={handleInputChange}
                label="Monto a Pagar"
                name="pago"
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

export default DeudasForm;
