import { createContext, useContext, useState } from "react";
import {
  getProveedoresApi,
  getProveedorApi,
  createProveedorApi,
  updateProveedorApi,
  deleteProveedorApi,
} from "../api/Proveedores.api";

export const ProveedorContext = createContext();

export const useProveedor = () => {
  const context = useContext(ProveedorContext);
  if (!context) {
    throw new Error(
      "useProveedor must be used within a ProveedorProvider"
    );
  }
  return context;
};

export const ProveedorContextProvider = ({ children }) => {
  const [proveedores, setProveedores] = useState([]);
  const [errors, setErrors] = useState();
  const [message, setMessage] = useState();

  async function getProveedores() {
    try {
      const response = await getProveedoresApi();
      setProveedores(response.data);
    } catch (error) {
      setErrors(error.response.data.msg);
      console.log(error.response.data.msg);
    }
  }

  async function getProveedor(id) {
    try {
      const response = await getProveedorApi(id);
      return response.data;
    } catch (error) {
      setErrors(error.response.data.msg);
      console.log(error.response.data.msg);
    }
  }

  async function createProveedor(proveedor) {
    try {
      const response = await createProveedorApi(proveedor);
      setMessage(response.data.msg);
      // return response.data;
    } catch (error) {
      setErrors(error.response.data.msg);
      console.log(error.response.data.msg);
    }
  }

  const updateProveedor = async (id, newproveedor) => {
    try {
      const response = await updateProveedorApi(id, newproveedor);
      setMessage(response.data.msg);
    } catch (error) {
      setErrors(error.response.data.msg);
      console.log(error.response.data.msg);
    }
  };

  const deleteProveedor = async (id) => {
    try {
      const response = await deleteProveedorApi(id);
      setMessage(response.data.msg);
    } catch (error) {
      setErrors(error.response.data.msg);
      console.log(error.response.data.msg);
    }
  };

  return (
    <ProveedorContext.Provider
      value={{
        proveedores,
        getProveedores,
        getProveedor,
        createProveedor,
        updateProveedor,
        deleteProveedor,
        message,
        setMessage,
        errors,
        setErrors,
      }}
    >
      {children}
    </ProveedorContext.Provider>
  );
};
