import { createContext, useContext, useState } from "react";
import {
  getProductosApi,
  getProductoApi,
  createProductoApi,
  updateProductoApi,
  deleteProductoApi,
} from "../api/Productos.api";

export const ProductoContext = createContext();

export const useProductos = () => {
  const context = useContext(ProductoContext);
  if (!context) {
    throw new Error("useProductos must be used within a ProductosProvider");
  }
  return context;
};

export const ProductoContextProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [errors, setErrors] = useState();
  const [message, setMessage] = useState();

  async function getProductos() {
    try {
      const response = await getProductosApi();
      setProductos(response.data.productos);
    } catch (error) {
      console.log(error);
    }
  }

  async function getProducto(id) {
    try {
      const response = await getProductoApi(id);
      return response.data.producto;
    } catch (error) {
      console.log(error);
    }
  }

  async function createProducto(producto) {
    try {
      const response = await createProductoApi(producto);
      setMessage(response.data.msg);
      // return response.data;
    } catch (error) {
      setErrors(error.response.data.msg);
      console.log(error.response.data.msg);
    }
  }

  const updateProducto = async (id, newproducto) => {
    try {
      const response = await updateProductoApi(id, newproducto);
      setMessage(response.data.msg);
    } catch (error) {
      setErrors(error.response.data.msg);
      console.log(error.response.data.msg);
    }
  };

  const deleteProducto = async (id) => {
    try {
      const response = await deleteProductoApi(id);
      setMessage(response.data.msg);
    } catch (error) {
      setErrors(error.response.data.msg);
      console.log(error.response.data.msg);
    }
  };

  return (
    <ProductoContext.Provider
      value={{
        productos,
        getProductos,
        getProducto,
        createProducto,
        updateProducto,
        deleteProducto,
        message,
        setMessage,
        errors,
        setErrors,
      }}
    >
      {children}
    </ProductoContext.Provider>
  );
};
