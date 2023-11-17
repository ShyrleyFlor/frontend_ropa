import React from "react";
import {
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  Stack,
  DialogActions,
  IconButton,
  ButtonGroup,
  Typography,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { useEffect, useState } from "react";
import Button from "../../../components/buttons/Button";
import { useProductos } from "../../../context/ProductosContext";
import { useCategoria } from "../../../context/CategoriaContext";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const ProductoCanti = ({ ButtonTitle, id, startIcon }) => {
  const { getProducto, createProducto, updateProducto } = useProductos();
  const [tempCantidad, setTempCantidad] = useState(0); // Nuevo estado para cantidad temporal

  const { categorias, getCategorias, createCategoria, getCategoria } =
    useCategoria();
  useEffect(() => {
    getCategorias();
  }, []);

  //   setSelectedTipo setSelectedSubtipo setSelectedTamanho setSelectedSexo setSelectedCategoria
  const [valuee, setValue] = useState({
    descripcion: "",
    tamanho: "",
    tipo: "",
    subtipo: "",
    precio: "",
    cantidad: "",
    sexo: "",
    categoriaId: null,
    va: 0,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValue((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleAdd = () => {
    setTempCantidad(+1); // Actualizar cantidad temporal
  };

  const handleRemove = () => {
    setTempCantidad(-1); // Actualizar cantidad temporal
  };

  //------------------------------------------------------------

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (id) {
      valuee.cantidad = valuee.cantidad + tempCantidad * valuee.va;
      await updateProducto(id, valuee);
    }
    setValue({
      descripcion: "",
      tamanho: "",
      tipo: "",
      subtipo: "",
      precio: "",
      cantidad: "",
      sexo: "",
      categoriaId: "",
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
    const loadProducto = async () => {
      if (id) {
        const Producto = await getProducto(id);

        setValue({
          descripcion: Producto.descripcion,
          tamanho: Producto.tamanho,
          tipo: Producto.tipo,
          subtipo: Producto.subtipo,
          precio: Producto.precio,
          cantidad: Producto.cantidad,
          sexo: Producto.sexo,
          categoriaId: Producto.categoria.id,
          va: 0,
        });
      }
    };
    loadProducto();
  }, [open]);

  return (
    <>
      <ButtonGroup>
        {ButtonTitle}
        <IconButton
          onClick={() => {
            handleClickOpen(), handleRemove();
          }}
        >
          <RemoveIcon />
        </IconButton>
        <IconButton
          onClick={() => {
            handleClickOpen(), handleAdd();
          }}
        >
          <AddIcon />
        </IconButton>
      </ButtonGroup>

      <Dialog
        style={{}}
        sx={{ bannerColor: "#2F528F" }}
        fullWidth
        maxWidth={"xs"}
        open={open}
        onClose={handleClose}
      >
        <form onSubmit={handleSubmit}>
          <DialogTitle>Cantidad</DialogTitle>
          <DialogContent>
            <Stack spacing={2} width="100%">
              <Typography>{` Cantidad Actual ${valuee.cantidad}`}</Typography>
              <TextField
                autoFocus
                style={{ marginTop: "10px" }}
                // value={valuee.va}
                required
                type="number"
                name="va"
                onChange={handleInputChange}
                label="Cantidad a añadir"
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button color="error" text={"Salir"} handleClick={handleClose} />
            <Button
            color="success"
              text={"Guardar"}
              handleClick={handleClose}
              type={"submit"}
              startIcon={<SaveIcon />}
            />
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default ProductoCanti;
