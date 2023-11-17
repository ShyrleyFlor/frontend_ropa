import React from "react";
import { useNavigate } from "react-router-dom";
import { useCategoria } from "../../context/CategoriaContext";
import { Box, Stack, TableCell, TableRow, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CategoriasForm from "../../pages/GerentePages/Probuctos/CategoriasForm";
// import Button from "../buttons/Button";

const CategoriaItem = ({ categoria }) => {
  const navigate = useNavigate();
  const { deleteCategoria } = useCategoria();

  return (
    <>
      <TableRow>
        <TableCell>
          h
          {/* {categoria.descripcion} */}
          </TableCell>
        {/* <TableCell>{categoria.descripcion}</TableCell> */}
        {/* <TableCell> */}
          {/* h */}
          {/* <Button>
            Eliminar
          </Button> */}
        {/* </TableCell> */}
        {/* // text="Eliminar"
          //   handleClick={() => deleteCategoria(categoria.id)}
          //   startIcon={<DeleteIcon />} */}
        {/* //   <TableCell>
        //   <CategoriasForm ButtonTitle="Editar"
        //    startIcon={<EditIcon />} 
        //    id={categoria.id}/>
        //    </TableCell>  */}
      </TableRow>
    </>
  );
};

export default CategoriaItem;
