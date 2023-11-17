import React, { useEffect, useState } from 'react'
import StackFond from '../../../components/StackFond'
import { useCliente } from '../../../context/ClienteContext';
import MesageBien from '../../../components/Mensages/MesageBien';
import MesageError from '../../../components/Mensages/MesageError';
import BoxTable from '../../../components/BoxTable';
import { InputAdornment, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, TextField, Typography } from '@mui/material';
import ButtonComponent from '../../../components/buttons/Button';
// import DeudasForm from '../../GerentePages/Clientes/DeudasForm';
import StackInferiorGere from '../../../components/StackInferiorGere';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import DeudasForm from './DeudasForm';

const DeudasPage = () => {
    const {
        clientes,
        getClientes,
        createCliente,
        deleteCliente,
        message,
        setMessage,
        errors,
        setErrors,
        updateCliente,
      } = useCliente();
      useEffect(() => {
        getClientes();
      }, [ createCliente, deleteCliente,updateCliente]);
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
    
      const filteredItem = clientes.filter((Item) =>
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
      Deudas
    </Typography>
    <BoxTable>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell align="center">
              <Typography variant="h6" fontWeight="bold">
                Nombre
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="h6" fontWeight="bold">
                Telefono
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="h6" fontWeight="bold">
              Descripción
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="h6" fontWeight="bold">
                Monto Pendiente
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="h6" fontWeight="bold">
                Monto de Deuda
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
                {item.telefono.toLocaleString("es-ES")}
              </TableCell>
              <TableCell component="th" scope="row">
                {item.descripcion}
              </TableCell>
              <TableCell component="th" scope="row">
              {item.deuda.toLocaleString("es-PY", {
                    style: "currency",
                    currency: "PYG",
                  })}
                </TableCell>
                <TableCell component="th" scope="row">
                  {item.monto_total.toLocaleString("es-PY", {
                    style: "currency",
                    currency: "PYG",
                  })}
              </TableCell>
              {/* <TableCell align="right">
                <ButtonComponent
                  text="Eliminar"
                  small={true}
                  handleClick={() => deleteProveedor(item.id)}
                  startIcon={<DeleteIcon />}
                />
              </TableCell> */}
              <TableCell align="right">
                <DeudasForm
                  ButtonTitle="Pagar"
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
        label="Buscar Nombre"
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

    <StackInferiorGere>
      {/* <DeudasForm ButtonTitle="Crear Cliente"></DeudasForm> */}
    </StackInferiorGere>
  </StackFond>
  )
}

export default DeudasPage