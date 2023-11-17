import React, { useEffect, useState } from "react";
import TabsV from "../../../components/TabsV";
import ButtonComponent from "../../../components/buttons/Button";
import { useNavigate } from "react-router-dom";
import StackInferior from "../../../components/StackInferior";
import { useCategoria } from "../../../context/CategoriaContext";
import { useProductos } from "../../../context/ProductosContext";
import StackFond from "../../../components/StackFond";
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
import BoxTable from "../../../components/BoxTable";

import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import { tipos, tamanhos, sexos } from "../../../data/index";
import ShoppingCart from "./ShoppingCart";
import { useVentas } from "../../../context/VentaContext";
import MesageBien from "../../../components/Mensages/MesageBien";
import MesageError from "../../../components/Mensages/MesageError";

const VendedorPage = () => {
  const navigate = useNavigate();

  const { productos, getProductos, createProducto, deleteProducto } =
    useProductos();

  useEffect(() => {
    getProductos();
  }, [productos]);

  const { categorias, getCategorias } = useCategoria();
  useEffect(() => {
    getCategorias();
  }, []);
  //--------------------------------------------------------------------------
  const [cantidades, setCantidades] = useState({}); // Estado para las cantidades de productos

  // Función para manejar cambios en la cantidad de un producto
  const handleCantidadChange = (productId, newCantidad) => {
    setCantidades((prevCantidades) => ({
      ...prevCantidades,
      [productId]: newCantidad,
    }));
  };

  //--------------------------------------------------------------------------
  //carrito de productos
  // Función para agregar un producto al carrito

  // const [productosCarrito, setProductosCarrito] = useState([]);
  const {
    productosCarrito,
    setProductosCarrito,
    productosAgregados,
    setProductosAgregados,
    message,
    setMessage,
    errors,
    setErrors,
  } = useVentas();

 

  // Función para eliminar un producto del carrito
  // const eliminarDelCarrito = (productoId) => {
  //   const nuevoCarrito = productosCarrito.filter(
  //     (producto) => producto.productoId !== productoId
  //   );
  //   setProductosCarrito(nuevoCarrito);
  // };

  const agregarAlCarrito = (producto) => {
    setProductosCarrito([...productosCarrito, producto]);
    setProductosAgregados([...productosAgregados, producto.productoId]);
  };

  const eliminarDelCarrito = (productoId) => {
    const nuevoCarrito = productosCarrito.filter(
      (producto) => producto.productoId !== productoId
    );
    setProductosCarrito(nuevoCarrito);
    setProductosAgregados(productosAgregados.filter((id) => id !== productoId));
  };

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
      <MesageBien message={message} setMessage={setMessage} />
      <MesageError message={errors} setMessage={setErrors} />
      <Typography variant="h4" fontWeight="bold">
        Vender
      </Typography>

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
              <TableCell align="center">
                <Typography variant="h6" fontWeight="bold">
                  Stock
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="h6" fontWeight="bold">
                  Cantidad
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
                <TableCell align="center">
                  {producto.precio.toLocaleString("es-PY", {
                    style: "currency",
                    currency: "PYG",
                  })}
                </TableCell>

                <TableCell align="center">{producto.sexo}</TableCell>
                <TableCell align="center">
                  {producto.categoria.descripcion}
                </TableCell>
                <TableCell align="center">
                  {producto.cantidad}
                </TableCell>
                <TableCell align="center">
                  <TextField
                    size="small"
                    type="number"
                    name="Cantidad"
                    disabled={productosAgregados.includes(producto.id)}
                    style={{ width: "75px" }}
                    value={cantidades[producto.id]} // Mostrar la cantidad actual o 1 si no está definida
                    // value={cantidades[producto.id] || 1} // Mostrar la cantidad actual o 1 si no está definida
                    onChange={(e) =>
                      handleCantidadChange(
                        producto.id,
                        parseInt(e.target.value, 10)
                      )
                    }
                  ></TextField>
                </TableCell>
                <TableCell align="center">
                  {productosAgregados.includes(producto.id) ? (
                    <ButtonComponent
                      text="Eliminar"
                      color="error"
                      handleClick={() => eliminarDelCarrito(producto.id)}
                      startIcon={<RemoveShoppingCartIcon />}
                    />
                  ) : (
                    <ButtonComponent
                      text={"Añadir"}
                      color="success"
                      handleClick={() =>
                        agregarAlCarrito({
                          productoId: producto.id, // Asigna el valor de id a producto.productoId
                          precio: producto.precio,
                          cantidad: cantidades[producto.id] || 1, // Utiliza la cantidad seleccionada
                          descripcion: producto.descripcion,
                          tamanho: producto.tamanho,
                          tipo: producto.tipo,
                          subtipo: producto.subtipo,
                          sexo: producto.sexo,
                          categoria: producto.categoria.descripcion,
                          precio_descuento: 0,
                        })
                      }
                      startIcon={<AddShoppingCartIcon />}
                    />
                  )}
                </TableCell>
                {/* <TableCell align="center">
                  
                </TableCell> */}
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
          label="Buscar "
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
      <StackInferior>
        <ShoppingCart
        // productosCarrito={productosCarrito}
        ></ShoppingCart>
        {/* <ButtonComponent
          small={true}
          // handleClick={() => navigate("/home")}
        >
          Carrito
        </ButtonComponent> */}
        <ButtonComponent color="error" small={true} handleClick={() => navigate("/home")}>
          Salir
        </ButtonComponent>
      </StackInferior>
    </StackFond>
  );
};

export default VendedorPage;
