import axios from "axios";

export const getComprasApi = async () => await axios.get("https://backendropa-production.up.railway.app/compras/listar");
export const getCompraApi = async (id) => await axios.get(`https://backendropa-production.up.railway.app/compras/listar/${id}`);
export const createCompraApi = async (compra) => await axios.post('https://backendropa-production.up.railway.app/compras/crear ', compra);
export const updateCompraApi = async (id,newcompra) => await axios.put(`https://backendropa-production.up.railway.app/compras/editar/${id}`, newcompra);
export const deleteCompraApi = async (id) => await axios.patch(`https://backendropa-production.up.railway.app/compras/eliminar/${id}`);
