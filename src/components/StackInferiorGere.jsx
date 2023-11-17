import React from "react";
import StackInferior from "./StackInferior";
import Button from "./buttons/Button";
import { useNavigate } from "react-router-dom";
const StackInferiorGere = ({ children, navigatee = "/home" }) => {
  const navigate = useNavigate();

  return (
    <StackInferior>
      {children}
      {/* <Button small={true} handleClick={() => history.goBack()}> */}
      {/* <Button small={true} handleClick={() => navigate("/home")}> */}
      <Button
        color="error"
        small={true}
        handleClick={() => navigate(navigatee)}
      >
        Salir
      </Button>
    </StackInferior>
  );
};
export default StackInferiorGere;
