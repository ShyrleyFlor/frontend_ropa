import axios from 'axios'

export const getProductosApi = async () => await axios.get("http://localhost:3000/productos/listar");
export const getProductoApi = async (id) => await axios.get(`http://localhost:3000/productos/listar/${id}`);
export const createProductoApi = async (producto) => await axios.post('http://localhost:3000/productos/crear', producto);
export const updateProductoApi = async (id,newproducto) => await axios.put(`http://localhost:3000/productos/editar/${id}`, newproducto);
export const deleteProductoApi = async (id) => await axios.patch(`http://localhost:3000/productos/eliminar/${id}`);

