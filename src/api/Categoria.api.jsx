import axios from 'axios'

export const getCategoriasApi = async () => await axios.get("https://backendropa-production.up.railway.app/categorias/listar");
export const getCategoriaApi = async (id) => await axios.get(`https://backendropa-production.up.railway.app/categorias/listar/${id}`);
export const createCategoriaApi = async (categoria) => await axios.post('https://backendropa-production.up.railway.app/categorias/crear ', categoria);
export const updateCategoriaApi = async (id,newcategoria) => await axios.put(`https://backendropa-production.up.railway.app/categorias/editar/${id}`, newcategoria);
export const deleteCategoriaApi = async (id) => await axios.patch(`https://backendropa-production.up.railway.app/categorias/eliminar/${id}`);
