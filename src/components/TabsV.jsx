import React from "react";
import Button from "./buttons/Button";
import { AppBar, Stack, Toolbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
const TabsV = ({ Fous = 0 }) => {
  const navigate = useNavigate();
  return (
    <Stack
      direction="row"
      spacing={1}
      p={1}
      style={{ borderBottom: "1px solid #bababa" }}
    >
      <Button
        variant={Fous === 1 ? "outlined" : "contained"}
        handleClick={() => {
          navigate("/home/ropas");
        }}
      >
        Ropas
      </Button>
      <Button
        variant={Fous === 2 ? "outlined" : "contained"}
        handleClick={() => {
          navigate("/home/accesorios");
        }}
      >
        Accesorios
      </Button>
      <Button
        variant={Fous === 3 ? "outlined" : "contained"}
        handleClick={() => {
          navigate("/home/muebles");
        }}
      >
        Muebles
      </Button>
    </Stack>
  );
};

export default TabsV;
