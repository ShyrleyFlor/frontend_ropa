import axios from "axios";

export const getProveedoresApi = async () =>
  await axios.get("https://backendropa-production.up.railway.app/distribuidores/listar");

export const getProveedorApi = async (id) =>
  await axios.get(`https://backendropa-production.up.railway.app/distribuidores/listar/${id}`);

export const createProveedorApi = async (proveedor) =>
  await axios.post("https://backendropa-production.up.railway.app/distribuidores/crear ", proveedor);

export const updateProveedorApi = async (id, newproveedor) =>
  await axios.put(
    `	https://backendropa-production.up.railway.app/distribuidores/editar/${id}`,
    newproveedor
  );

export const deleteProveedorApi = async (id) =>
  await axios.patch(`https://backendropa-production.up.railway.app/distribuidores/eliminar/${id}`);
