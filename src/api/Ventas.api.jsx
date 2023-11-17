import axios from "axios";

export const getVentasApi = async () => await axios.get("http://localhost:3000/ventas/listar");
export const getVentaApi = async (id) => await axios.get(`http://localhost:3000/ventas/listar/${id}`);
export const createVentaApi = async (venta) => await axios.post('http://localhost:3000/ventas/crear', venta);
export const updateVentaApi = async (id,newventa) => await axios.put(`http://localhost:3000/ventas/editar/${id}`, newventa);
export const deleteVentaApi = async (id) => await axios.patch(`http://localhost:3000/ventas/eliminar/${id}`);
