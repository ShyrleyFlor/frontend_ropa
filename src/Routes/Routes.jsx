import { Route, Routes, useNavigate } from "react-router-dom";
import HiddenPath from "./HiddenPath";

import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home";
import VendedorPage from "../pages/VendedorPages/Vendedor/VendedorPage";
import ComprarPage from "../pages/GerentePages/Compras/ComprarPage";
import InformePage from "../pages/GerentePages/Informe/InformePage";
import ProveedorPage from "../pages/GerentePages/Compras/ProveedorPage";
import CategoriasPage from "../pages/GerentePages/Probuctos/CategoriasPage";
import ProbuctosPage from "../pages/GerentePages/Probuctos/ProbuctosPage";
import { useLogin } from "../context/LoginContext";
import { useEffect, useState } from "react";
import ClientesPage from "../pages/GerentePages/Clientes/ClientesPage";
import DeudasPage from "../pages/VendedorPages/Deudas/DeudasPage";

function RoutesApp() {
  const { userLogged, setUserLogged } = useLogin();
  useEffect(() => {
    setUserLogged(JSON.parse(sessionStorage.getItem("user")));
  }, []);

  return (
    <>
      <Routes>
        {/* Y si re recarga la pagina  */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        {/* <Route  element={<HiddenPath isHidden={false} />}> */}
        <Route element={<HiddenPath isHidden={!!userLogged} />}>
          <Route path="/home" element={<Home />} />
        </Route>

        <Route
          element={
            <HiddenPath
              isHidden={!!userLogged && userLogged.token == 0}
              redirect="/home"
            />
          }
        >
          <Route path="/home/vender" element={<VendedorPage  />} />
          <Route path="/home/deudas" element={<DeudasPage  />} />
        </Route>
        <Route
          element={
            <HiddenPath
              isHidden={!!userLogged && userLogged.token == 1}
              redirect="/home"
            />
          }
        >
          <Route path="/home/comprar" element={<ComprarPage />} />
          <Route path="/home/comprar/proveedores" element={<ProveedorPage />} />
          <Route path="/home/productos" element={<ProbuctosPage />} />
          <Route
            path="/home/probuctos/categorias"
            element={<CategoriasPage />}
          />
          <Route path="/home/informes" element={<InformePage />} />
          <Route path="/home/clientes" element={<ClientesPage />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default RoutesApp;
