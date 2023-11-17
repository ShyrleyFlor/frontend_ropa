import React from "react";
import {
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  Stack,
  DialogActions,
  Typography,
  TableHead,
  TableRow,
  TableCell,
  Table,
  TableBody,
} from "@mui/material";
import { useEffect, useState } from "react";
import Button from "../../../components/buttons/Button";
import { useVentas } from "../../../context/VentaContext";

import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import ButtonComponent from "../../../components/buttons/Button";
import MesageBien from "../../../components/Mensages/MesageBien";
import { PDFDownloadLink } from "@react-pdf/renderer";
import TicketPDF from "./TicketPDF";

const ShoppingCart = ({ ButtonTitle, id, startIcon }) => {
  const {
    getVenta,
    createVenta,
    updateVenta,
    deleteVenta,
    productosCarrito,
    setProductosCarrito,
    setProductosAgregados,
  } = useVentas();
  // -------------------------------------------------------------
  // Fecha actual
  // Obtén la fecha actual en el formato deseado (YYYY-MM-DD)
  const currentDate = new Date().toISOString().slice(0, 10);
  // -------------------------------------------------------------
  // Control para descuento
  const Contraseña = "123456";
  const [disabled, setDisabled] = useState(false);

  // --------------------------------------------------------------
  const [valuee, setValue] = useState({
    contraseña: "",
    precio_total: "",
    fecha: currentDate,
    precio_descuento: 0,
    productos: productosCarrito,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValue((prevState) => ({ ...prevState, [name]: value }));
  };

  //------------------------------------------------------------

  const handleSubmit = async (event) => {
    // event.preventDefault();
    // if (id) {
    // valuee.cantidad = valuee.cantidad + tempCantidad * valuee.va;
    await createVenta(valuee);
    console.log(valuee);
    // }
    setValue({
      contraseña: "",
      fecha: currentDate,
      precio_total: "",
      precio_descuento: 0,
      productos: [],
    });
    setProductosCarrito([]);
    setProductosAgregados([]);
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

  // Calcular el subtotal de cada producto y sumarlos para obtener el total del carrito
  const totalCarrito = productosCarrito.reduce((total, producto) => {
    const subtotalProducto = producto.precio * producto.cantidad;
    valuee.precio_total = total + subtotalProducto- valuee.precio_descuento;
    valuee.productos = productosCarrito;
    return total + subtotalProducto - valuee.precio_descuento;
  }, 0);

  return (
    <>
      <ButtonComponent
        startIcon={<ShoppingCartCheckoutIcon />}
        handleClick={handleClickOpen}
      >
        Carrito
      </ButtonComponent>

      <Dialog
        style={{}}
        sx={{ bannerColor: "#2F528F" }}
        // fullWidth
        maxWidth={"lg"}
        open={open}
        onClose={handleClose}
      >
        {/* <form onSubmit={handleSubmit}> */}
        <DialogTitle>Carrito de Compras</DialogTitle>
        <DialogContent>
          {/* <form onSubmit={handleSubmit}>
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
           
           <DialogActions>
             <Button text={"Salir"} handleClick={handleClose} />
             <Button
               text={"Guardar"}
               handleClick={handleClose}
               type={"submit"}
               startIcon={<SaveIcon />}
             />
           </DialogActions>
         </form> */}

          <Table>
            <TableHead>
              <TableRow padding="none">
                <TableCell align="center">Descripción</TableCell>
                <TableCell align="center">Tipo</TableCell>
                <TableCell align="center">Subtipo</TableCell>
                <TableCell align="center">Tamaño</TableCell>
                <TableCell align="center">Precio</TableCell>
                <TableCell align="center">Cantidad</TableCell>
                <TableCell align="center">Subtotal</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {productosCarrito.map((producto) => (
                <TableRow key={producto.productoId} padding="none">
                  <TableCell>{producto.descripcion}</TableCell>
                  <TableCell>{producto.tipo}</TableCell>
                  <TableCell>{producto.subtipo}</TableCell>
                  <TableCell>{producto.tamanho}</TableCell>
                  <TableCell>
                    {producto.precio.toLocaleString("es-PY", {
                      style: "currency",
                      currency: "PYG",
                    })}
                  </TableCell>
                  <TableCell>{producto.cantidad}</TableCell>
                  <TableCell>
                    {(producto.precio * producto.cantidad).toLocaleString(
                      "es-PY",
                      {
                        style: "currency",
                        currency: "PYG",
                      }
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {/* <p>{valuee.}</p> */}
          {/* {valuee} */}

          <Stack spacing={2} width="100%">
            <TextField
              autoFocus
              style={{ marginTop: "10px" }}
              value={valuee.fecha}
              // required
              type="date"
              name="fecha"
              onChange={handleInputChange}
              label="Fecha"
            />
            {disabled && (
              <>
                <TextField
                  style={{ marginTop: "10px" }}
                  value={valuee.contraseña}
                  // required
                  type="password"
                  name="contraseña"
                  onChange={handleInputChange}
                  label="Contraseña"
                />
                <TextField
                  style={{ marginTop: "10px" }}
                  value={valuee.precio_descuento}
                  // required
                  disabled={valuee.contraseña != Contraseña}
                  type="number"
                  name="precio_descuento"
                  onChange={handleInputChange}
                  label="Descuento"
                />
              </>
            )}
          </Stack>

          <Typography variant="h6" display="block" gutterBottom>
            Total :
            {totalCarrito.toLocaleString("es-PY", {
              style: "currency",
              currency: "PYG",
            })}
          </Typography>
          {/* <Typography variant="h6" display="block" gutterBottom>           
          Descuento :
            {valuee.precio_descuento.toLocaleString("es-PY", {
              style: "currency",
              currency: "PYG",
            })}
          </Typography> */}
        </DialogContent>

        <DialogActions>
          <Button variant="contained" color="primary">
            <PDFDownloadLink
              style={{
                color: "white",
                textDecoration: "none",
                width: "100%",
                height: "100%",
              }}
              document={<TicketPDF data={productosCarrito} />}
              // fileName={nombreCompras}
            >
              {({ blob, url, loading, error }) =>
                loading ? "Generando Compra PDF..." : `Descargar Compra PDF`
              }
            </PDFDownloadLink>
          </Button>
          <Button
            text={"Descuento"}
            handleClick={() => setDisabled(!disabled)}
          />
          <Button color="error" text={"Salir"} handleClick={handleClose} />
          <Button
            color="success"
            text={"Guardar"}
            disabled={disabled ? valuee.contraseña != Contraseña : false}
            // type="submit"
            handleClick={() => {
              handleSubmit();
              F;
              handleClose();
            }}
          />
        </DialogActions>
        {/* </form> */}
      </Dialog>
    </>
  );
};

export default ShoppingCart;
