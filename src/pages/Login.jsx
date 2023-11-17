import Card from "../components/Card";
import Button from "../components/buttons/Button";
import { Box, CardContent, CardActions, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Text from "../components/text/Text";
import TextPas from "../components/text/TextPas";
import { Form, Formik } from "formik";

import LockRoundedIcon from "@mui/icons-material/LockRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import Logo from "../components/text/Logo";
import { useLogin } from "../context/LoginContext";
import Error from "../components/Mensages/Error";

function Login() {
  const navigate = useNavigate();
  const { autenticarUser, errorsUser, userLogged } = useLogin();
  const [state, setState] = useState(0);
  const [errors, setErrors] = useState({});

  const [user, setUser] = useState({
    user: "",
    password: "",
    token: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validar los campos antes de enviar
    const validationErrors = validateFields(user);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    await autenticarUser(user);
  };

  useEffect(() => {
    // if (Object.keys(userLogged).length > 0) {
    if (!!userLogged) {
      navigate("/home");
    }
  }, [userLogged]);

  const validateFields = (fields) => {
    const errors = {};

    if (!fields.user) {
      errors.user = "El usuario es requerido";
    }

    if (!fields.password) {
      errors.password = "El password es requerido";
    }

    return errors;
  };

  return (
    <Box display="flex" alignItems="center">
      <Logo />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        style={{
          position: "absolute",
          top: "50%",
          transform: "translate(-50%, -50%)",
          right: 0,
        }}
      >
        {" "}
        <form onSubmit={handleSubmit}>
          {state === 0 ? (
            <Card>
              <CardContent>
                <Stack spacing={3}>
                  <Button
                    text={"Gerente"}
                    small={false}
                    handleClick={() => {
                      setState(1), setUser({ user: "Gerente" });
                    }}
                  />
                  <Button
                    text={"Vendedor"}
                    small={false}
                    handleClick={() => {
                      setState(-2), setUser({ user: "Vendedor" });
                    }}
                  />
                </Stack>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <Stack sx={{ width: "80%" }} spacing={2}>
                {errors.user && <Error>{errors.user}</Error>}
                {errors.password && <Error>{errors.password}</Error>}
                {Object.keys(errorsUser).length > 0 && (
                  <Error>{errorsUser}</Error>
                )}
              </Stack>

              <CardContent
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "350px",
                  height: "300px",
                }}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  style={{
                    width: "350px",
                  }}
                >
                  <AccountCircleRoundedIcon sx={{ fontSize: 40 }} />
                  <Text
                    DefaultValue={user.user}
                    name={"user"}
                    onChange={handleInputChange}
                  />
                </Box>
                <Box
                  display="flex"
                  alignItems="center"
                  style={{
                    width: "350px",
                  }}
                >
                  <LockRoundedIcon sx={{ fontSize: 40 }} />
                  <TextPas name={"password"} onChange={handleInputChange} />
                </Box>
              </CardContent>
              <CardActions>
                <Button color="error" text={"Salir"} handleClick={() => setState(0)} />
                <Button
                  text={"Iniciar"}
                  type="submit"

                  // handleClick={() => navigate("/home")}
                />
              </CardActions>
            </Card>
          )}
        </form>
      </Box>
    </Box>
  );
}

export default Login;
