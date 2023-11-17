import { createContext } from "react";
import { LoginProvider } from "./LoginContext";
import { CategoriaContextProvider } from "./CategoriaContext";
import { ProductoContextProvider } from "./ProductosContext";
import { ProveedorContextProvider } from "./ProveedoresContext";
import { CompraContextProvider } from "./CompraContext";
import { ClienteContextProvider } from "./ClienteContext";
import { VentasContextProvider } from "./VentaContext"; 
export const ContextGlob = createContext();

export const use = () => {
  const context = use(ContextGlob);
  if (!context) {
    throw new Error("use must be used within a ContextProvider");
  }
  return context;
};

export const ContextGlobProvider = ({ children }) => {
  return (
    <LoginProvider>
      <VentasContextProvider>
        <ClienteContextProvider>
          <CompraContextProvider>
            <ProveedorContextProvider>
              <CategoriaContextProvider>
                <ProductoContextProvider>
                  <CategoriaContextProvider>
                    {children}
                  </CategoriaContextProvider>
                </ProductoContextProvider>
              </CategoriaContextProvider>
            </ProveedorContextProvider>
          </CompraContextProvider>
        </ClienteContextProvider>
      </VentasContextProvider>
    </LoginProvider>
  );
};
