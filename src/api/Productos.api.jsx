import axios from 'axios'

export const getProductosApi = async () => await axios.get("https://backendropa-production.up.railway.app/productos/listar");
export const getProductoApi = async (id) => await axios.get(`https://backendropa-production.up.railway.app/productos/listar/${id}`);
export const createProductoApi = async (producto) => await axios.post('https://backendropa-production.up.railway.app/productos/crear', producto);
export const updateProductoApi = async (id,newproducto) => await axios.put(`https://backendropa-production.up.railway.app/productos/editar/${id}`, newproducto);
export const deleteProductoApi = async (id) => await axios.patch(`https://backendropa-production.up.railway.app/productos/eliminar/${id}`);

