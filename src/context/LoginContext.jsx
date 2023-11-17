import { createContext, useContext, useEffect, useState } from "react";
import {
  getUsersApi,
  registrarUserApi,
  autenticarUserApi,
} from "../api/User.api";

export const LoginContext = createContext();

export const useLogin = () => {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error("useCiudades must be used within a CiudadProvider");
  }
  return context;
};

export const LoginProvider = ({ children }) => {
  const [userLogged, setUserLogged] = useState([]);
  const [errorsUser, setErrorsUser] = useState([]);

  async function CargarUsuarios() {
    const response = await getUsersApi();
    setUser(response.data);
  }
  async function autenticarUser(user) {
    try {
      const response = await autenticarUserApi(user);
      setUserLogged(response.data);
      sessionStorage.setItem('user', JSON.stringify(response.data));

      setErrorsUser([]);
    } catch (error) {
      setErrorsUser(error.response.data.msg);
    }
  }

  // useEffect(() => {
  //   sessionStorage.setItem('user', JSON.stringify(userLogged));

  // }, [userLogged]);

  return (
    <LoginContext.Provider
      value={{
        
        autenticarUser,
        CargarUsuarios,
        userLogged,
        errorsUser,
        setErrorsUser,
        setUserLogged,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};
