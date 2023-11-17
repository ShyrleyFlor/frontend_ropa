import React from "react";
import { Navigate, Outlet } from "react-router-dom";
//Se utiliza para redireccionar las rutas que no sean login cuando esta activo
//Outlet es el componente que dice que continua su camino normal

import { useLogin } from "../context/LoginContext";

const HiddenPath = ({isHidden, redirect = "/login",children}) => {
  const { userLogged } = useLogin();

  if (!isHidden) {
    return <Navigate to={redirect} replace />;
  }

  return children ? children : <Outlet />;
};

export default HiddenPath;
