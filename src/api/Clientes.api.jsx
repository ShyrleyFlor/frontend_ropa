import axios from "axios";

export const getClientesApi = async () =>  await axios.get("https://backendropa-production.up.railway.app//clientes/listar");
export const getClienteApi = async (id) => await axios.get(`https://backendropa-production.up.railway.app//clientes/listar/${id}`);
export const createClienteApi = async (cliente) => await axios.post('https://backendropa-production.up.railway.app//clientes/crear', cliente);
export const updateClienteApi = async (id,newcliente) => await axios.put(`https://backendropa-production.up.railway.app//clientes/editar/${id}`, newcliente);
export const deleteClienteApi = async (id) => await axios.patch(`https://backendropa-production.up.railway.app//clientes/eliminar/${id}`);
