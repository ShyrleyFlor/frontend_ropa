import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination,
  TextField,
  InputAdornment,
} from "@mui/material";
import StackInferiorGere from "../../../components/StackInferiorGere";
import { useCategoria } from "../../../context/CategoriaContext";
import CategoriasForm from "./CategoriasForm";
import ButtonComponent from "../../../components/buttons/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import BoxTable from "../../../components/BoxTable";
import MesageBien from "../../../components/Mensages/MesageBien";
import MesageError from "../../../components/Mensages/MesageError";
import StackFond from "../../../components/StackFond";

const CategoriasPage = () => {
  const {
    categorias,
    getCategorias,
    createCategoria,
    deleteCategoria,
    message,
    setMessage,
    errors,
    setErrors,
  } = useCategoria();

  useEffect(() => {
    getCategorias();
  }, [createCategoria]);

  //--------------------------------------------------------------------------
  // rows
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const filteredItem = categorias.filter((Item) =>
    Item.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedItem = filteredItem.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <StackFond>
      <MesageBien message={message} setMessage={setMessage} />
      <MesageError message={errors} setMessage={setErrors} />
      {/* /-----------------------------------------------------------------------*/}
      <Typography variant="h4" fontWeight="bold">
        Categorias
      </Typography>

      <BoxTable>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={3}>
                <Typography variant="h6" fontWeight="bold">
                  Categorias
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedItem.map((categoria) => (
              <TableRow key={categoria.id}>
                <TableCell component="th" scope="row">
                  {categoria.descripcion}
                </TableCell>
                <TableCell align="right">
                  <ButtonComponent
                    text="Eliminar"
                    small={true}
                    handleClick={() => deleteCategoria(categoria.id)}
                    startIcon={<DeleteIcon />}
                  />
                </TableCell>
                <TableCell align="right">
                  <CategoriasForm
                    ButtonTitle="Editar"
                    startIcon={<EditIcon />}
                    id={categoria.id}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredItem.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <TextField
          autoFocus
          label="Buscar categoría"
          value={searchTerm}
          onChange={handleSearchChange}
          variant="outlined"
          sx={{ m: 2, width: "90%" }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </BoxTable>
      <StackInferiorGere navigatee="/home/productos">
        <CategoriasForm ButtonTitle="Crear Categoria" />
      </StackInferiorGere>
    </StackFond>
  );
};

export default CategoriasPage;
