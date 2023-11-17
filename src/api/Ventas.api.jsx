import axios from "axios";

export const getVentasApi = async () => await axios.get("https://backendropa-production.up.railway.app//ventas/listar");
export const getVentaApi = async (id) => await axios.get(`https://backendropa-production.up.railway.app//ventas/listar/${id}`);
export const createVentaApi = async (venta) => await axios.post('https://backendropa-production.up.railway.app//ventas/crear', venta);
export const updateVentaApi = async (id,newventa) => await axios.put(`https://backendropa-production.up.railway.app//ventas/editar/${id}`, newventa);
export const deleteVentaApi = async (id) => await axios.patch(`https://backendropa-production.up.railway.app//ventas/eliminar/${id}`);
