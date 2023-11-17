import {
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  Stack,
  DialogActions,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { useEffect, useState } from "react";
import Button from "../../../components/buttons/Button";

import React from "react";
import { useCategoria } from "../../../context/CategoriaContext";

const CategoriasForm = ({ ButtonTitle, id, startIcon }) => {
  // console.log(id)
  const { getCategoria, createCategoria, updateCategoria } = useCategoria();
  const [valuee, setValue] = useState({
    descripcion: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValue({ ...valuee, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (id) {
      await updateCategoria(id, valuee);
    } else {
      await createCategoria(valuee);
    }
    setValue({
      descripcion: "",
    });
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
  // const params = useParams();

  useEffect(() => {
    const loadCategoria = async () => {
      if (id) {
        const Categoria = await getCategoria(id);
        setValue({
          descripcion: Categoria.descripcion,
        });
      }
    };
    loadCategoria();
  }, [open]);

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
          <DialogTitle>Categorias</DialogTitle>
          <DialogContent>
            <Stack spacing={2} width="100%">
              <TextField
                autoFocus
                value={valuee.descripcion}
                style={{ marginTop: "10px" }}
                required
                name="descripcion"
                onChange={handleInputChange}
                label="Descripción"
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button color="error" text={"Salir"} handleClick={handleClose} />
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

export default CategoriasForm;
