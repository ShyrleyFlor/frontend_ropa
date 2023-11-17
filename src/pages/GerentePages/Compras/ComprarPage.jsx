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
import ComprarForm from "./ComprarForm";
import ButtonComponent from "../../../components/buttons/Button";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import BoxTable from "../../../components/BoxTable";
import MesageBien from "../../../components/Mensages/MesageBien";
import MesageError from "../../../components/Mensages/MesageError";
import StackFond from "../../../components/StackFond";
import { useCompra } from "../../../context/CompraContext";

const ComprarPage = () => {
  const {
    compras,
    getCompras,
    createCompra,
    deleteCompra,
    message,
    setMessage,
    errors,
    setErrors,
  } = useCompra();

  useEffect(() => {
    getCompras();
  }, [createCompra]);

  //--------------------------------------------------------------------------
  //filtros fecha
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

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

  // const filteredItem = compras.filter((Item) =>
  //   Item.distribuidore.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  // );
  // const filteredItem = compras.filter((Item) => {
  //   if (startDate && endDate) {
  //     const itemDate = new Date(Item.fecha);
  //     const start = new Date(startDate);
  //     const end = new Date(endDate);
  //     return itemDate >= start && itemDate <= end;
  //   }
  //   return true;
  // });
  const filteredItem = compras.filter((Item) => {
    const itemDate = new Date(Item.fecha);
    const start = new Date(startDate);
    const end = new Date(endDate);

    const isDateMatch =
      (!startDate || itemDate >= start) && (!endDate || itemDate <= end);

    const isDistributorMatch = Item.distribuidore.nombre
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return isDateMatch && isDistributorMatch;
  });

  const paginatedItem = filteredItem.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const navigate = useNavigate();
  return (
    <StackFond>
      <MesageBien message={message} setMessage={setMessage} />
      <MesageError message={errors} setMessage={setErrors} />
      {/* /-----------------------------------------------------------------------*/}
      <Typography variant="h4" fontWeight="bold">
        Comprar
      </Typography>
      <BoxTable>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <Typography variant="h6" fontWeight="bold">
                  Fecha
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6" fontWeight="bold">
                  Total
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6" fontWeight="bold">
                  Distribuidor
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedItem.map((Item) => (
              <TableRow key={Item.id}>
                <TableCell component="th" scope="row">
                  {Item.fecha}
                </TableCell>
                <TableCell component="th" scope="row">
                  {Item.total.toLocaleString("es-PY", {
                    style: "currency",
                    currency: "PYG",
                  })}
                </TableCell>
                <TableCell component="th" scope="row">
                  {Item.distribuidore.nombre}
                </TableCell>
                <TableCell align="right">
                  <ButtonComponent
                    text="Eliminar"
                    small={true}
                    handleClick={() => deleteCompra(Item.id)}
                    startIcon={<DeleteIcon />}
                  />
                </TableCell>
                <TableCell align="right">
                  <ComprarForm
                    ButtonTitle="Editar"
                    startIcon={<EditIcon />}
                    id={Item.id}
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
          label="Buscar distribuidore"
          value={searchTerm}
          onChange={handleSearchChange}
          variant="outlined"
          sx={{ m: 1,
            //  width: "40%"
             }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          label="Fecha de Inicio"
          value={startDate}
          onChange={handleStartDateChange}
          type="date"
          sx={{ m: 1,
            //  width: "23%" 
            }}

          InputLabelProps={{
            shrink: true,
          }}
        />

        <TextField
          label="Fecha de Fin"
          value={endDate}
          onChange={handleEndDateChange}
          type="date"
          sx={{ m: 1,
            //  width: "23%"
         }}

          InputLabelProps={{
            shrink: true,
          }}
        />
      </BoxTable>

      <StackInferiorGere>
        <ButtonComponent
          text={"Proveedores"}
          handleClick={() => navigate("/home/comprar/proveedores")}
        />
        <ComprarForm ButtonTitle="Registrar Compra"></ComprarForm>

        {/* </ButtonComponent> */}
      </StackInferiorGere>
    </StackFond>
  );
};

export default ComprarPage;
