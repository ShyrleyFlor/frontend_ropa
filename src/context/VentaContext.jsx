import { createContext, useContext, useState } from "react";
import {
  getVentasApi,
  getVentaApi,
  createVentaApi,
  updateVentaApi,
  deleteVentaApi,
} from "../api/Ventas.api";


export const VentasContext = createContext();

export const useVentas = () => {
  const context = useContext(VentasContext);
  if (!context) {
    throw new Error("useVentas must be used within a VentasProvider");
  }
  return context;
}

export const VentasContextProvider = ({ children }) => {
  const [ventas, setVentas] = useState([]);
  const [errors, setErrors] = useState();
  const [message, setMessage] = useState();
  const [productosCarrito, setProductosCarrito] = useState([]);
  const [productosAgregados, setProductosAgregados] = useState([]);

  async function getVentas() {
    try {
      const response = await getVentasApi();
      setVentas(response.data.ventas);
    } catch (error) {
      setErrors(error.response.data.mensaje);
      console.log(error.response.data.mensaje);
    }
  }

  async function getVenta(id) {
    try {
      const response = await getVentaApi(id);
      return response.data.ventas;
    } catch (error) {
      setErrors(error.response.data.mensaje);
      console.log(error.response.data.mensaje);
    }
  }

  async function createVenta(venta) {
      // console.log(venta);
    try {
      const response = await createVentaApi(venta);
      setMessage(response.data.mensaje);
      console.log(response.data.mensaje);
      // return response.data;
    } catch (error) {
      setErrors(error.response.data.mensaje);
      console.log(error.response.data.mensaje);
    }
  }

  const updateVenta = async (id, newventa) => {
    try {
      const response = await updateVentaApi(id, newventa);
      setMessage(response.data.mensaje);
    } catch (error) {
      setErrors(error.response.data.mensaje);
      console.log(error.response.data.mensaje);
    }
  }

  const deleteVenta = async (id) => {
    try {
      const response = await deleteVentaApi(id);
      setMessage(response.data.mensaje);
    } catch (error) {
      setErrors(error.response.data.mensaje);
      console.log(error.response.data.mensaje);
    }
  }

  return (
    <VentasContext.Provider
      value={{
        ventas,
        getVentas,
        getVenta,
        createVenta,
        updateVenta,
        deleteVenta,
        message,
        setMessage,
        errors,
        setErrors,
        productosCarrito,
        setProductosCarrito,
        productosAgregados, setProductosAgregados
      }}
    >
      {children}
    </VentasContext.Provider>

  )
}
