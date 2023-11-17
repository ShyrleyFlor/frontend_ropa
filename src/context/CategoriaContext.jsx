import { createContext, useContext, useState } from "react";
import {
  getCategoriasApi,
  getCategoriaApi,
  createCategoriaApi,
  updateCategoriaApi,
  deleteCategoriaApi,
} from "../api/Categoria.api";

export const CategoriaContext = createContext();

export const useCategoria = () => {
  const context = useContext(CategoriaContext);
  if (!context) {
    throw new Error("useCategoria must be used within a CategoriaProvider");
  }
  return context;
};

export const CategoriaContextProvider = ({ children }) => {
  const [categorias, setCategorias] = useState([]);
  const [errors, setErrors] = useState();
  const [message, setMessage] = useState();

  async function getCategorias() {
    try {
      const response = await getCategoriasApi();
      setCategorias(response.data.categorias);
    } catch (error) {
      setErrors(error.response.data.msg);
      // console.log(error.response.data.msg);
    }
  }

  async function getCategoria(id) {
    try {
      const response = await getCategoriaApi(id);
      return response.data.categorias;
    } catch (error) {
      setErrors(error.response.data.msg);
      console.log(error.response.data.msg);
    }
  }

  async function createCategoria(categoria) {
    try {
      const response = await createCategoriaApi(categoria);
      setMessage(response.data.msg);
      // return response.data;
    } catch (error) {
      setErrors(error.response.data.msg);
      console.log(error.response.data.msg);
    }
  }

  const updateCategoria = async (id, newcategoria) => {
    try {
      const response = await updateCategoriaApi(id, newcategoria);
      setMessage(response.data.msg);
    } catch (error) {
      setErrors(error.response.data.msg);
      console.log(error.response.data.msg);
    }
  };

  const deleteCategoria = async (id) => {
    try {
      const response = await deleteCategoriaApi(id);
      setMessage(response.data.msg);
    } catch (error) {
      setErrors(error.response.data.msg);
      console.log(error.response.data.msg);
    }
  };

  return (
    <CategoriaContext.Provider
      value={{
        getCategorias,
        getCategoria,
        createCategoria,
        updateCategoria,
        deleteCategoria,
        categorias,
        message,
        setMessage,
        errors,
        setErrors,
      }}
    >
      {children}
    </CategoriaContext.Provider>
  );
};
