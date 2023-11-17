import axios from "axios";

export const getClientesApi = async () =>  await axios.get("http://localhost:3000/clientes/listar");
export const getClienteApi = async (id) => await axios.get(`http://localhost:3000/clientes/listar/${id}`);
export const createClienteApi = async (cliente) => await axios.post('http://localhost:3000/clientes/crear', cliente);
export const updateClienteApi = async (id,newcliente) => await axios.put(`http://localhost:3000/clientes/editar/${id}`, newcliente);
export const deleteClienteApi = async (id) => await axios.patch(`http://localhost:3000/clientes/eliminar/${id}`);
