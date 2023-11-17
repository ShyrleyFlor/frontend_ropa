import axios from "axios";

export const getProveedoresApi = async () =>
  await axios.get("http://localhost:3000/distribuidores/listar");

export const getProveedorApi = async (id) =>
  await axios.get(`http://localhost:3000/distribuidores/listar/${id}`);

export const createProveedorApi = async (proveedor) =>
  await axios.post("http://localhost:3000/distribuidores/crear ", proveedor);

export const updateProveedorApi = async (id, newproveedor) =>
  await axios.put(
    `	http://localhost:3000/distribuidores/editar/${id}`,
    newproveedor
  );

export const deleteProveedorApi = async (id) =>
  await axios.patch(`http://localhost:3000/distribuidores/eliminar/${id}`);
