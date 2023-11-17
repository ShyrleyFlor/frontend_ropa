import React from "react";
import {
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  Stack,
  DialogActions,
  Autocomplete,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { useEffect, useState } from "react";
import Button from "../../../components/buttons/Button";
import { useProductos } from "../../../context/ProductosContext";
import { tipos, subtipos, tamanhos, sexos } from "../../../data/index";
import { useCategoria } from "../../../context/CategoriaContext";

const ProductosForm = ({ ButtonTitle, id, startIcon }) => {
  const { getProducto, createProducto, updateProducto } = useProductos();

  const { categorias, getCategorias, createCategoria, getCategoria } =
    useCategoria();
  useEffect(() => {
    getCategorias();
  }, []);

  //   setSelectedTipo setSelectedSubtipo setSelectedTamanho setSelectedSexo setSelectedCategoria

  const [selectedTipo, setSelectedTipo] = useState(null);
  const [selectedSubtipo, setSelectedSubtipo] = useState(null);
  const [selectedTamanho, setSelectedTamanho] = useState(null);
  const [selectedSexo, setSelectedSexo] = useState(null);
  const [selectedCategoria, setSelectedCategoria] = useState(null);
  const [valuee, setValue] = useState({
    descripcion: "",
    tamanho: "",
    tipo: "",
    subtipo: "",
    precio: "",
    cantidad: "",
    sexo: "",
    categoriaId: null,
  });

  const handleTipoChange = (event, newValue) => {
    setSelectedTipo(newValue);
    setSelectedSubtipo(null); // Limpiar la selección del subtipo cuando cambia el tipo
    setValue((prevState) => ({ ...prevState, tipo: newValue?.tipos || "" }));
  };

  const handleSubtipoChange = (event, newValue) => {
    setSelectedSubtipo(newValue);
    setValue((prevState) => ({
      ...prevState,
      subtipo: newValue?.subtipos || "",
    }));
  };

  const handleSexoChange = (event, newValue) => {
    setSelectedSexo(newValue);
    setValue((prevState) => ({ ...prevState, sexo: newValue?.sexo || "" }));
  };

  const handleTamanhoChange = (event, newValue) => {
    setSelectedTamanho(newValue);
    setValue((prevState) => ({
      ...prevState,
      tamanho: newValue?.tamanhos || "",
    }));
  };

  const handleCategoriaChange = (event, newValue) => {
    setSelectedCategoria(newValue);
    setValue((prevState) => ({
      ...prevState,
      categoriaId: newValue?.id || "",
    }));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValue((prevState) => ({ ...prevState, [name]: value }));
  };

  const filteredSubtipos = selectedTipo
    ? subtipos.filter((subtipo) => subtipo.tipos === selectedTipo.tipos)
    : [];

  //------------------------------------------------------------

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (id) {
      await updateProducto(id, valuee);
    } else {
      await createProducto(valuee);
    }
    setValue({
      descripcion: "",
      tamanho: "",
      tipo: "",
      subtipo: "",
      precio: "",
      cantidad: "",
      sexo: "",
      categoriaId: "",
    });
    setSelectedTipo(null);
    setSelectedSubtipo(null);
    setSelectedTamanho(null);
    setSelectedSexo(null);
    setSelectedCategoria(null);
  };

  //-----------------------------------------------------------
  //Control de ventana

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //-----------------------------------------------------------
  //Carga de opciones para editar
  //se buscan los id para evitar mensaje de advertencia
  const findIdByTamanho = (tamanho) => {
    const found = tamanhos.find((item) => item.tamanhos === tamanho);
    return found ? found.id : null;
  };
  const findIdByTipo = (tipo) => {
    const found = tipos.find((item) => item.tipos === tipo);
    return found ? found.id : null;
  };
  const findIdByTipoAndSubtipo = (tipo, subtipo) => {
    const foundSubtipo = subtipos.find(
      (item) => item.tipos === tipo && item.subtipos === subtipo
    );
    return foundSubtipo ? foundSubtipo.id : null;
  };
  const findIdBySexo = (sexo) => {
    const found = sexos.find((item) => item.sexo === sexo);
    return found ? found.id : null;
  };

  useEffect(() => {
    const loadProducto = async () => {
      if (id) {
        const Producto = await getProducto(id);
// console.log(Producto);
        setValue({
          descripcion: Producto.descripcion,
          tamanho: Producto.tamanho,
          tipo: Producto.tipo,
          subtipo: Producto.subtipo,
          precio: Producto.precio,
          cantidad: Producto.cantidad,
          sexo: Producto.sexo,
          categoriaId: Producto.categoria.id,
        });
        const idTamanho = findIdByTamanho(Producto.tamanho);
        const idTipo = findIdByTipo(Producto.tipo);
        const idSubtipo = findIdByTipoAndSubtipo(
          Producto.tipo,
          Producto.subtipo
        );
        const idSexo = findIdBySexo(Producto.sexo);
        setSelectedTamanho({ id: idTamanho, tamanhos: Producto.tamanho });
        setSelectedTipo({ id: idTipo, tipos: Producto.tipo });
        setSelectedSubtipo({
          id: idSubtipo,
          tipos: Producto.tipo,
          subtipos: Producto.subtipo,
        });
        setSelectedSexo({ id: idSexo, sexo: Producto.sexo });
        setSelectedCategoria(Producto.categoria);
      }
    };
    loadProducto();
  }, [open]);

  // Función para obtener la opción por ID
  const getOptionById = (id) => {
    return categorias.find((categoria) => categoria.id === id) || null;
  };

  // Función para establecer el valor inicial coincidente con las opciones disponibles
  useEffect(() => {
    if (selectedCategoria) {
      const matchingOption = getOptionById(selectedCategoria.id);
      setSelectedCategoria(matchingOption);
    }
  }, [categorias, selectedCategoria]);

  return (
    <>
      <Button startIcon={startIcon} handleClick={handleClickOpen}>
        {ButtonTitle}
      </Button>
      <Dialog
        style={{}}
        sx={{ bannerColor: "#2F528F" }}
        fullWidth
        maxWidth={"xs"}
        open={open}
        onClose={handleClose}
      >
        <form onSubmit={handleSubmit}>
          <DialogTitle>Productos</DialogTitle>
          <DialogContent >
            <Stack spacing={2} width="100%">
              <TextField
                multiline
                value={valuee.descripcion}
                style={{ marginTop: "10px" }}
                required
                name="descripcion"
                onChange={handleInputChange}
                label="Descripción"
              />
              <Autocomplete
                autoHighlight
                options={tamanhos}
                getOptionLabel={(option) => option.tamanhos}
                value={selectedTamanho}
                onChange={handleTamanhoChange}
                renderInput={(params) => (
                  <TextField {...params} label="Tamaños" required/>
                )}
                isOptionEqualToValue={(value, option) => value.id === option.id}
              />
              <Autocomplete
                autoHighlight
                required
                options={tipos}
                getOptionLabel={(option) => option.tipos}
                value={selectedTipo}
                onChange={handleTipoChange}
                renderInput={(params) => <TextField {...params} required label="Tipo" />}
                isOptionEqualToValue={(value, option) => value.id === option.id}
              />

              {selectedTipo && (
                <Autocomplete
                  autoHighlight
                  required
                  options={filteredSubtipos}
                  getOptionLabel={(option) => option.subtipos}
                  value={selectedSubtipo}
                  onChange={handleSubtipoChange}
                  renderInput={(params) => (
                    <TextField {...params} label="Subtipo" />
                  )}
                  isOptionEqualToValue={(value, option) =>
                    value.id === option.id
                  }
                />
              )}
              <TextField
                value={valuee.precio}
                required
                type="number"
                name="precio"
                onChange={handleInputChange}
                label="Precio"
              />
              <TextField
                value={valuee.cantidad}
                required
                type="number"
                name="cantidad"
                onChange={handleInputChange}
                label="Cantidad"
              />
              <Autocomplete
                autoHighlight
                options={sexos}
                required
                getOptionLabel={(option) => option.sexo}
                value={selectedSexo}
                onChange={handleSexoChange}
                renderInput={(params) => <TextField {...params} required label="Sexo" />}
                isOptionEqualToValue={(value, option) => value.id === option.id}
              />

              <Autocomplete
                autoHighlight
                required
                options={categorias}
                getOptionLabel={(option) => option.descripcion}
                value={selectedCategoria}
                onChange={handleCategoriaChange}
                renderInput={(params) => (
                  <TextField {...params} required label="Categorias" />
                )}
                isOptionEqualToValue={(value, option) => value.id === option.id}
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button text={"Salir"} handleClick={handleClose} />
            <Button
            color="success"
              text={"Guardar"}
              handleClick={handleClose}
              type={"submit"}
              startIcon={<SaveIcon />}
            />
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default ProductosForm;
