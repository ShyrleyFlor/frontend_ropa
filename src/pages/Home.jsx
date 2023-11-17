import { Box, CardActions, CardContent, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import ButtonComponent from "../components/buttons/Button";
import CardApp from "../components/card";
import { useNavigate } from "react-router-dom";
import Logo from "../components/text/Logo";
import { useLogin } from "../context/LoginContext";

const Home = () => {
  const [state, setState] = useState(0);
  const { userLogged, setUserLogged } = useLogin();
  useEffect(() => {
    if (!(!!userLogged)) {
      navigate("/login");
    }
  }, [userLogged]);
  // const history = useHistory();

  

  const navigate = useNavigate();
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
        <CardApp>
          <CardContent>
            {userLogged.token > 0 ? (
              <Stack spacing={3}>
                <ButtonComponent
                  text={"Clientes"}
                  small={false}
                  handleClick={() => navigate("/home/clientes")}
                />

                <ButtonComponent
                  text={"Producto"}
                  small={false}
                  handleClick={() => navigate("/home/productos")}
                />
                <ButtonComponent
                  text={"Comprar"}
                  small={false}
                  handleClick={() => navigate("/home/comprar")}
                />
                <ButtonComponent
                  text={"Informe"}
                  small={false}
                  handleClick={() => navigate("/home/informes")}
                />
              </Stack>
            ) : (
              <Stack spacing={3}>
                <ButtonComponent
                  text={"Vender"}
                  small={false}
                  handleClick={() => navigate("/home/vender")}
                />

                <ButtonComponent
                  text={"Deudas"}
                  small={false}
                  handleClick={() => navigate("/home/deudas")}
                />
             
              </Stack>
            )}
          </CardContent>
          <CardActions>
            <ButtonComponent
              text={"Salir  "}
              color="error"
          
              
              handleClick={  () => {
                 sessionStorage.removeItem("user");
                //  return <Redirect to="/" />;
                //  history.push('/');
                // location.reload();

                //  window.location.reload();

                setUserLogged();
              }}
            />
          </CardActions>
        </CardApp>
      </Box>
    </Box>
    // handleClick={() => {
    //   sessionStorage.removeItem("user");
    //   setTimeout(() => {
    //     setUserLogged({});
    //   }, 0);
    // }}
  );
};

export default Home;
