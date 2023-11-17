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
  MenuItem,
} from "@mui/material";
import StackInferiorGere from "../../../components/StackInferiorGere";
import ButtonComponent from "../../../components/buttons/Button";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import BoxTable from "../../../components/BoxTable";
import MesageBien from "../../../components/Mensages/MesageBien";
import MesageError from "../../../components/Mensages/MesageError";
import { useProductos } from "../../../context/ProductosContext";
import { useCategoria } from "../../../context/CategoriaContext";
import ProductosForm from "./ProductosForm";
import StackFond from "../../../components/StackFond";
import { tipos, tamanhos, sexos } from "../../../data/index";

import ProductoCanti from "./ProductoCanti";

const ProbuctosPage = () => {
  const {
    productos,
    getProductos,
    createProducto,
    deleteProducto,
    message,
    setMessage,
    errors,
    setErrors,
  } = useProductos();

  useEffect(() => {
    getProductos();
  }, [productos]);

  const { categorias, getCategorias,} =
    useCategoria();

  useEffect(() => {
    getCategorias();
  }, []);

  const navigate = useNavigate();
  //--------------------------------------------------------------------------
  //filtros
  const [sizeFilter, setSizeFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [categoriaFilter, setCategoriaFilter] = useState("");

  const handleSizeFilterChange = (event) => {
    setSizeFilter(event.target.value);
    setPage(0); // Reset pagination when applying a new filter
  };

  const handleTypeFilterChange = (event) => {
    setTypeFilter(event.target.value);
    setPage(0); // Reset pagination when applying a new filter
  };

  const handleGenderFilterChange = (event) => {
    setGenderFilter(event.target.value);
    setPage(0); // Reset pagination when applying a new filter
  };

  const handleCategoriaFilterChange = (event) => {
    setCategoriaFilter(event.target.value);
    setPage(0); // Reset pagination when applying a new filter
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
  //---------------------------------------------------------------------------
  // modifico el filtro orijinal

  // const filteredItem = productos.filter((Item) =>
  //   Item.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
  // );
  // // ---------------------------------------------------------------------------
  // const filteredItem = productos.filter(
  //   (Item) =>
  //   Item.descripcion.toLowerCase().includes(searchTerm.toLowerCase())     &&
  //   (sizeFilter === "" || Item.tamanho === sizeFilter) &&
  //   (typeFilter === "" || Item.tipo === typeFilter) &&
  //   (genderFilter === "" || Item.sexo === genderFilter) &&
  //   (categoriaFilter === "" || Item.categoria.descripcion === categoriaFilter)
  //   );
    // ---------------------------------------------------------------------------
    const filteredItem = productos.filter((Item) => {
      const searchTermLowerCase = searchTerm.toLowerCase();
      const tamanhoLowerCase = Item.tamanho.toLowerCase();
      const descripcionLowerCase = Item.descripcion.toLowerCase();
      const tipoLowerCase = Item.tipo.toLowerCase();
      const subtipooLowerCase = Item.subtipo.toLowerCase();
    
      return (
        (tamanhoLowerCase.includes(searchTermLowerCase) || descripcionLowerCase.includes(searchTermLowerCase) ||
         tipoLowerCase.includes(searchTermLowerCase) || subtipooLowerCase.includes(searchTermLowerCase)) &&
        (sizeFilter === "" || Item.tamanho === sizeFilter) &&
        (typeFilter === "" || tipoLowerCase === typeFilter) &&
        (genderFilter === "" || Item.sexo === genderFilter) &&
        (categoriaFilter === "" || Item.categoria.descripcion === categoriaFilter)
      );
    });
    
    
    
  //---------------------------------------------------------------------------

  const paginatedItem = filteredItem.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <StackFond>
      <Typography variant="h4" fontWeight="bold">
        Productos
      </Typography>
      {/* errors, setErrors */}
      <MesageError message={errors} setMessage={setErrors} />
      <MesageBien message={message} setMessage={setMessage} />
      <BoxTable>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell align="center">
                <Typography variant="h6" fontWeight="bold">
                Descripción
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6" fontWeight="bold">
                  Tamaño
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6" fontWeight="bold">
                  Tipo
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6" fontWeight="bold">
                  Subtipo
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6" fontWeight="bold">
                  Precio
                </Typography>
              </TableCell>
              <TableCell align="center" colSpan={1}>
                <Typography variant="h6" fontWeight="bold">
                  Cantidad
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6" fontWeight="bold">
                  Sexo
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6" fontWeight="bold">
                  Categoria
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedItem.map((producto) => (
              <TableRow key={producto.id}>
                <TableCell align="center">{producto.descripcion}</TableCell>
                <TableCell align="center">{producto.tamanho}</TableCell>
                <TableCell align="center">{producto.tipo}</TableCell>
                <TableCell align="center">{producto.subtipo}</TableCell>
                {/* <TableCell align="center">{producto.precio}</TableCell> */}
                <TableCell align="center">
                  {producto.precio.toLocaleString("es-PY", {
                    style: "currency",
                    currency: "PYG",
                  })}
                </TableCell>

                <TableCell align="center" valign="middle">
                  {/* </TableCell>
                <TableCell align="center"> */}
                {/* {`${producto.cantidad}Un`} */}
                  <ProductoCanti id={producto.id} ButtonTitle={`${producto.cantidad}Un`}/>
                </TableCell>
                <TableCell align="center">{producto.sexo}</TableCell>
                <TableCell align="center">
                  {producto.categoria.descripcion}
                </TableCell>

                <TableCell align="center">
                  <ButtonComponent
                    text={"Eliminar"}
                    handleClick={() => deleteProducto(producto.id)}
                    startIcon={<DeleteIcon />}
                  />
                </TableCell>
                <TableCell align="center">
                  <ProductosForm
                    ButtonTitle="Editar"
                    startIcon={<EditIcon />}
                    id={producto.id}
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
        {/* //-------------------------------------------------------------------------- 
        todos los filtros */}
        <TextField
          autoFocus
          label="Buscar"
          value={searchTerm}
          onChange={handleSearchChange}
          variant="outlined"
          sx={{
            m: 1,
            // width: "90%"
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
          select
          label="Tamaño"
          value={sizeFilter}
          onChange={handleSizeFilterChange}
          variant="outlined"
          sx={{ m: 1, minWidth: "105px", autowidtha: true }}
          // autowidth={true}
        >
          <MenuItem value="">Todos</MenuItem>
          {tamanhos.map((size) => (
            <MenuItem key={size.id} value={size.tamanhos}>
              {size.tamanhos}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Tipo"
          value={typeFilter}
          onChange={handleTypeFilterChange}
          variant="outlined"
          sx={{ m: 1, minWidth: "80px", autowidtha: true }}
          // autoWidth={true}
        >
          <MenuItem value="">Todos</MenuItem>
          {tipos.map((tipo) => (
            <MenuItem key={tipo.id} value={tipo.tipos}>
              {tipo.tipos}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Sexo"
          value={genderFilter}
          onChange={handleGenderFilterChange}
          variant="outlined"
          sx={{ m: 1, minWidth: "80px", autowidtha: true }}
          // autoWidth={true}
        >
          <MenuItem value="">Todos</MenuItem>
          {sexos.map((sexo) => (
            <MenuItem key={sexo.id} value={sexo.sexo}>
              {sexo.sexo}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Categoria"
          value={categoriaFilter}
          onChange={handleCategoriaFilterChange}
          variant="outlined"
          sx={{ m: 1, minWidth: "120px", autowidtha: true }}
          // autoWidth={true}
        >
          <MenuItem value="">Todos</MenuItem>
          {categorias.map((categoria) => (
            <MenuItem key={categoria.id} value={categoria.descripcion}>
              {categoria.descripcion}
            </MenuItem>
          ))}
        </TextField>

        {/* //-------------------------------------------------------------------------- */}
      </BoxTable>
      <StackInferiorGere>
        <ProductosForm ButtonTitle="Crear Producto" />
        <ButtonComponent
          text={"Categorias"}
          handleClick={() => navigate("/home/probuctos/categorias")}
        />
      </StackInferiorGere>
    </StackFond>
  );
};

export default ProbuctosPage;
