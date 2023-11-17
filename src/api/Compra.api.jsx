import axios from "axios";

export const getComprasApi = async () => await axios.get("http://localhost:3000/compras/listar");
export const getCompraApi = async (id) => await axios.get(`http://localhost:3000/compras/listar/${id}`);
export const createCompraApi = async (compra) => await axios.post('http://localhost:3000/compras/crear ', compra);
export const updateCompraApi = async (id,newcompra) => await axios.put(`http://localhost:3000/compras/editar/${id}`, newcompra);
export const deleteCompraApi = async (id) => await axios.patch(`http://localhost:3000/compras/eliminar/${id}`);
