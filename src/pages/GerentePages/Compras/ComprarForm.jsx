import React, { useState, useEffect } from "react";
import {
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  Stack,
  DialogActions,
  Autocomplete,
} from "@mui/material";
import Formm from "../../../components/Formm";
import Button from "../../../components/buttons/Button";
import SaveIcon from "@mui/icons-material/Save";
import { options } from "../../../data/index";
import { useProveedor } from "../../../context/ProveedoresContext";
import { useCompra } from "../../../context/CompraContext";
const ComprarForm = ({ ButtonTitle, id, startIcon }) => {
  const { getProveedores, proveedores, getProveedor } = useProveedor();
  const { compras, getCompra, createCompra, deleteCompra, updateCompra } =
    useCompra();

  useEffect(() => {
    getProveedores();
  }, []);
  const [valuee, setValue] = useState({
    fecha: "",
    total: "",
    distribuidoreId: "",
  });

  const [selectedProveedor, setSelectedProveedor] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValue((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (id) {
      await updateCompra(id, valuee);
    } else {
      await createCompra(valuee);
    }
    setValue({
      fecha: "",
      total: "",
      distribuidoreId: "",
    });
    setSelectedProveedor(null);
  };
  //selectedProveedor
  //-------------------------------------------------------------
  //Control de opciones de autocompletar
  const handleOptionSelect = (event, newValue) => {
    setSelectedProveedor(newValue);
    // console.log(newValue);
    setValue((prevState) => ({
      ...prevState,
      distribuidoreId: newValue?.id || "",
    }));
  };

  //-----------------------------------------------------------
  //Control de ventana

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //-------------------------------------------------------------
  //Carga de opciones para editar
  useEffect(() => {
    const loadData = async () => {
      if (id) {
        const data = await getCompra(id);
        setValue({
          fecha: data.fecha,
          total: data.total,
          distribuidoreId: data.distribuidoreId,
        });
        const ProveedorData = async (id) => {
          const data = await getProveedor(id);
          // console.log(dataa)
          setSelectedProveedor(data);
        };
        ProveedorData(data.distribuidoreId);
        //  setSelectedProveedor( await getProveedor(data.distribuidoreId));
        // console.log(getProveedor(data.distribuidoreId))
        // console.log(data.distribuidoreId)
      }
    };
    loadData();
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
        maxWidth={"xs"} // Puedes utilizar 'xs', 'sm', 'md', 'lg', 'xl' o un número en píxeles
        //    maxHeight={500}
        open={open}
        onClose={handleClose}
      >
        <form onSubmit={handleSubmit}>
          <DialogTitle>Comprar</DialogTitle>
          <DialogContent>
            <Stack spacing={2} width="100%">
              <Autocomplete
                style={{ marginTop: "10px" }}
                autoHighlight
                options={proveedores}
                value={selectedProveedor}
                getOptionLabel={(option) => option.nombre}
                renderInput={(params) => (
                  <TextField {...params} label="Proveedor" required />
                )}
                onChange={handleOptionSelect}
                isOptionEqualToValue={(value, option) => value.id === option.id}
              />

              <TextField
                onChange={handleInputChange}
                value={valuee.fecha}
                required
                focused
                label="Fecha"
                name="fecha"
                id="fecha"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                onChange={handleInputChange}
                value={valuee.total}
                required
                label="Monto"
                name="total"
                id="total"
                type="number"
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

export default ComprarForm;

// const options = [
//   { nombre: "The Shawshank Redemption", distribuidoreId: 1 },
//   { nombre: "The Godfather", distribuidoreId: 2 },
//   { nombre: "The Godfather: Part II", distribuidoreId: 3 },
//   { nombre: "The Dark Knight", distribuidoreId: 4 },
//   { nombre: "12 Angry Men", distribuidoreId: 5 },
//   { nombre: "Schindler's List", distribuidoreId: 6 },
//   { nombre: "Pulp Fiction", distribuidoreId: 7 },
// ];
