import React, { useEffect, useState } from "react";
import StackInferiorGere from "../../../components/StackInferiorGere";
import ReactPDF from "@react-pdf/renderer";
import InformePDF from "./InformePDF";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
// import SimCardDownloadIcon from "@mui/icons-material/SimCardDownloadIcon"
import MoveToInboxIcon from "@mui/icons-material/MoveToInbox";
import MoveToInboxRoundedIcon from "@mui/icons-material/MoveToInboxRounded";
import SimCardDownloadRoundedIcon from "@mui/icons-material/SimCardDownloadRounded";
import {
  Box,
  Button,
  FormLabel,
  Input,
  Paper,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination,
  TextField,
  InputAdornment,
  Table,
} from "@mui/material";
import { useCompra } from "../../../context/CompraContext";
import BoxTable from "../../../components/BoxTable";
import DeudasPDF from "./DeudasPDF";
import InformeVentasPDF from "./VentasPDF";

const InformePage = () => {
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
  //--------------------------------------------------------------------------

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
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  // const fechaInicio = "2023-08-01";
  // const fechaFin = "2023-08-31";

  const handleFechaInicioChange = (event) => {
    setFechaInicio(event.target.value);
  };

  const handleFechaFinChange = (event) => {
    setFechaFin(event.target.value);
  };
  const filteredItem = compras.filter((Item) => {
    const itemDate = new Date(Item.fecha);
    const start = new Date(fechaInicio);
    const end = new Date(fechaFin);

    const isDateMatch =
      (!fechaInicio || itemDate >= start) && (!fechaFin || itemDate <= end);

    const isDistributorMatch = Item.distribuidore.nombre
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return isDateMatch && isDistributorMatch;
  });

  const paginatedItem = filteredItem.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const nombreCompras = `Compras_${fechaInicio}_a_${fechaFin}.pdf`;
  const nombreDeudas = `Deudas_${fechaInicio}_a_${fechaFin}.pdf`;
  const nombreVentas = `Ventas_${fechaInicio}_a_${fechaFin}.pdf`;

  return (
    <Box minHeight="100vh" bgcolor="#f3f6f9" m={-1}>
      {/* <PDFViewer width={"100%"} height={"850px"}>
        <InformePDF />
      </PDFViewer> */}
      {/* ReactPDF.render(<InformePDF />, `${__dirname}/example.pdf`); */}
      <Box
        // width=
        // height="850px"
        m={5}
        style={{ display: "inline-block", width: "fit-content" }}
      >
        <Paper elevation={3}>
          <Box
            //  m={1}
            p={1}
          >
            <FormLabel>Fecha de inicio: </FormLabel>
            <Input
              type="date"
              value={fechaInicio}
              onChange={handleFechaInicioChange}
            />
          </Box>
          <Box
            // m={1}
            p={1}
          >
            <FormLabel>Fecha de fin: </FormLabel>
            <Input
              type="date"
              value={fechaFin}
              onChange={handleFechaFinChange}
            />
          </Box>
        </Paper>
      </Box>

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
      </BoxTable>
      {/* <button onClick={handleGenerarInforme}>Generar Informe</button> */}
      <StackInferiorGere>
        <Button variant="contained" color="primary">
          <PDFDownloadLink
            style={{
              color: "white",
              textDecoration: "none",
              width: "100%",
              height: "100%",
            }}
            document={<InformePDF startDate={fechaInicio} endDate={fechaFin} />}
            fileName={nombreCompras}
          >
            {({ blob, url, loading, error }) =>
              loading ? "Generando Compra PDF..." : `Descargar Compra PDF`
            }
          </PDFDownloadLink>
        </Button>
        <Button variant="contained" color="primary">
          <PDFDownloadLink
            style={{
              color: "white",
              textDecoration: "none",
              width: "100%",
              height: "100%",
            }}
            document={<DeudasPDF startDate={fechaInicio} endDate={fechaFin} />}
            fileName={nombreDeudas}
          >
            {({ blob, url, loading, error }) =>
              loading ? "Generando Deudas PDF..." : `Descargar Deudas PDF`
            }
          </PDFDownloadLink>
        </Button>
        <Button variant="contained" color="primary">
          <PDFDownloadLink
            style={{
              color: "white",
              textDecoration: "none",
              width: "100%",
              height: "100%",
            }}
            document={<InformeVentasPDF startDate={fechaInicio} endDate={fechaFin} />}
            fileName={nombreVentas}
            encoding='utf-8'
          >
            {({ blob, url, loading, error }) =>
              loading ? "Generando Ventas PDF..." : `Descargar Ventas PDF`
            }
          </PDFDownloadLink>
        </Button>
      </StackInferiorGere>
    </Box>
  );
};

export default InformePage;
