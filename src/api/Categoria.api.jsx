import axios from 'axios'

export const getCategoriasApi = async () => await axios.get("http://localhost:3000/categorias/listar");
export const getCategoriaApi = async (id) => await axios.get(`http://localhost:3000/categorias/listar/${id}`);
export const createCategoriaApi = async (categoria) => await axios.post('http://localhost:3000/categorias/crear ', categoria);
export const updateCategoriaApi = async (id,newcategoria) => await axios.put(`http://localhost:3000/categorias/editar/${id}`, newcategoria);
export const deleteCategoriaApi = async (id) => await axios.patch(`http://localhost:3000/categorias/eliminar/${id}`);
