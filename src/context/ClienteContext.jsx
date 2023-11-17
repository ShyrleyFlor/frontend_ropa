import {createContext, useState, useContext} from 'react';
import {
    getClientesApi,
    getClienteApi,
    createClienteApi,
    updateClienteApi,
    deleteClienteApi,
} from "../api/Clientes.api";

export const ClienteContext = createContext();

export const useCliente = () => {
    const context = useContext(ClienteContext);
    if (!context) {
        throw new Error("useCliente must be used within a ClienteProvider");
    }
    return context;
}

export const ClienteContextProvider = ({ children }) => {
    const [clientes, setClientes] = useState([]);
    const [errors, setErrors] = useState();
    const [message, setMessage] = useState();

    async function getClientes() {
        try {
            const response = await getClientesApi();
            setClientes(response.data);
        } catch (error) {
            setErrors(error.response.data.msg);
            console.log(error.response.data.msg);
        }
    }

    async function getCliente(id) {
        try {
            const response = await getClienteApi(id);
            // console.log(response.data);
            return response.data;
        } catch (error) {
            setErrors(error.response.data.msg);
            console.log(error.response.data.msg);
        }
    }

    async function createCliente(cliente) {
        try {
            const response = await createClienteApi(cliente);
            setMessage(response.data.msg);
        } catch (error) {
            setErrors(error.response.data.msg);
            console.log(error.response.data.msg);
        }
    }

    const updateCliente = async (id, newcliente) => {
        try {
            const response = await updateClienteApi(id, newcliente);
            setMessage(response.data.msg);
        } catch (error) {
            setErrors(error.response.data.msg);
            console.log(error.response.data.msg);
        }
    }

    const deleteCliente = async (id) => {
        try {
            const response = await deleteClienteApi(id);
            setMessage(response.data.msg);
        } catch (error) {
            setErrors(error.response.data.msg);
            console.log(error.response.data.msg);
        }
    }

    return (
        <ClienteContext.Provider
            value={{
                clientes,
                errors,
                message,
                getClientes,
                getCliente,
                createCliente,
                updateCliente,
                deleteCliente,
                setMessage,
                setErrors
            }}
        >
            {children}
        </ClienteContext.Provider>
    )
}