import axios from "axios";

const getUsersApi = async () => await axios.get("https://backendropa-production.up.railway.app//listar");

const registrarUserApi = async (user) => await axios.post("https://backendropa-production.up.railway.app//registrar", user);
// listar registrar autenticar
const autenticarUserApi = async (user) => await axios.post("https://backendropa-production.up.railway.app//autenticar", user);

export { getUsersApi, registrarUserApi, autenticarUserApi };