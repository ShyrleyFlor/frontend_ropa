import axios from "axios";

const getUsersApi = async () => await axios.get("http://localhost:3000/listar");

const registrarUserApi = async (user) => await axios.post("http://localhost:3000/registrar", user);
// listar registrar autenticar
const autenticarUserApi = async (user) => await axios.post("http://localhost:3000/autenticar", user);

export { getUsersApi, registrarUserApi, autenticarUserApi };