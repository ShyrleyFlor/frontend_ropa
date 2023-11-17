import { createContext, useContext, useState } from "react";
import {
    getComprasApi,
    getCompraApi,
    createCompraApi,
    updateCompraApi,
    deleteCompraApi,
} from "../api/Compra.api";

export const CompraContext = createContext();

export const useCompra = () => {
    const context = useContext(CompraContext);
    if (!context) {
        throw new Error("useCompra must be used within a CompraProvider");
    }
    return context;
}

export const CompraContextProvider = ({ children }) => {
    const [compras, setCompras] = useState([]);
    const [errors, setErrors] = useState();
    const [message, setMessage] = useState();

    async function getCompras() {
        try {
            const response = await getComprasApi();
            setCompras(response.data);
        } catch (error) {
            setErrors(error.response.data.msg);
            console.log(error.response.data.msg);
        }
    }

    async function getCompra(id) {
        try {
            const response = await getCompraApi(id);
            return response.data;
        } catch (error) {
            setErrors(error.response.data.msg);
            console.log(error.response.data.msg);
        }
    }

    async function createCompra(compra) {
        try {
            const response = await createCompraApi(compra);
            setMessage(response.data.msg);
            // return response.data;
        } catch (error) {
            setErrors(error.response.data.msg);
            console.log(error.response.data.msg);
        }
    }

    const updateCompra = async (id, newcompra) => {
        try {
            const response = await updateCompraApi(id, newcompra);
            setMessage(response.data.msg);
        } catch (error) {
            setErrors(error.response.data.msg);
            console.log(error.response.data.msg);
        }
    }

    const deleteCompra = async (id) => {
        try {
            const response = await deleteCompraApi(id);
            setMessage(response.data.msg);
        } catch (error) {
            setErrors(error.response.data.msg);
            console.log(error.response.data.msg);
        }
    }

    return (
        <CompraContext.Provider
            value={{
                compras,
                getCompras,
                getCompra,
                createCompra,
                updateCompra,
                deleteCompra,
                message,
                setMessage,
                errors,
                setErrors,
            }}
        >
            {children}
        </CompraContext.Provider>
    )
}