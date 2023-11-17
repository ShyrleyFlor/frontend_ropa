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
import ProveedorForm from "./ProveedorForm";
import ButtonComponent from "../../../components/buttons/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import BoxTable from "../../../components/BoxTable";
import MesageBien from "../../../components/Mensages/MesageBien";
import MesageError from "../../../components/Mensages/MesageError";
import StackFond from "../../../components/StackFond";
import { useProveedor } from "../../../context/ProveedoresContext";
const ProveedorPage = () => {
  const {
    proveedores,
    getProveedores,
    createProveedor,
    deleteProveedor,
    message,
    setMessage,
    errors,
    setErrors,
  } = useProveedor();
  useEffect(() => {
    getProveedores();
  }, [proveedores]);

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

  const filteredItem = proveedores.filter((Item) =>
    Item.nombre.toLowerCase().includes(searchTerm.toLowerCase())
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
        Proveedores
      </Typography>
      <BoxTable>
        <Table stickyHeader>
        <TableHead>
            <TableRow>
              <TableCell align="center">
                <Typography variant="h6" fontWeight="bold">
                Proveedor
                </Typography>
              </TableCell>
              <TableCell align="center" >
                <Typography variant="h6" fontWeight="bold">
                Telefono
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {paginatedItem.map((item) => (
              <TableRow key={item.id}>
                <TableCell component="th" scope="row">
                  {item.nombre}
                </TableCell>
                <TableCell component="th" scope="row">
                  {item.telefono}
                </TableCell>
                <TableCell align="right">
                  <ButtonComponent
                    text="Eliminar"
                    small={true}
                    handleClick={() => deleteProveedor(item.id)}
                    startIcon={<DeleteIcon />}
                  />
                </TableCell>
                <TableCell align="right">
                  <ProveedorForm
                    ButtonTitle="Editar"
                    startIcon={<EditIcon />}
                    id={item.id}
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
          label="Buscar Proveedor"
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
      <StackInferiorGere navigatee="/home/comprar">
        <ProveedorForm ButtonTitle="Crear Proveedor"></ProveedorForm>
      </StackInferiorGere>
    </StackFond>
  );
};

export default ProveedorPage;
