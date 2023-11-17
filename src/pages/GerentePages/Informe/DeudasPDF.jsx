import React, { useEffect, useState } from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { useCliente } from "../../../context/ClienteContext"; // Cambiar a ClienteContext
import { getClientesApi } from "../../../api/Clientes.api"; // Cambiar a Cliente.api

const DeudasPDF = ({ startDate, endDate }) => {
  const [clientes, setClientes] = useState(); // Cambiar a clientes

  async function getClientes() {
    // Cambiar a getClientes
    try {
      const response = await getClientesApi(); // Cambiar a getClientesApi
      setClientes(response.data);
    } catch (error) {
      console.log(error.response.data.msg);
    }
  }

  useEffect(() => {
    getClientes();
  }, []);

  const clientesEnRango = () => {
    if (!clientes) return [];
    return clientes.filter(
      (cliente) =>
        new Date(cliente.updatedAt) >= new Date(startDate) &&
        new Date(cliente.updatedAt) <= new Date(endDate)
    );
  };


  const styles = StyleSheet.create({
    body: {
      paddingTop: 35,
      paddingBottom: 65,
      paddingHorizontal: 35,
      textAlign: "center",
    },
    table: {
      border: 1,
      textAlign: "center",
      width: "100%",
    },
    row: {
      display: "flex",
      flexDirection: "row",
      borderTop: "1px solid #EEE",
      // paddingTop: 8,
      // paddingBottom: 8,
    },
    row22: {
      borderTop: "none",
      borderBottomWidth: 0.5,
      borderBottomColor: "#112131",
      borderBottomStyle: "solid",
    },
    header: {
      backgroundColor: "#adadad",
      borderTop: "none",
      borderBottomWidth: 2,
      borderBottomColor: "#112131",
      borderBottomStyle: "solid",
    },
    bold: {
      fontWeight: "bold",
    },

    row1: {
      fontSize: 12,
      borderLeftWidth: "1",
      width: "33%",
    },
    row2: {
      fontSize: 12,
      borderLeftWidth: "1",
      width: "33%",
    },
    row3: {
      fontSize: 12,

      width: "33%",
      borderLeftWidth: "1",
    },
    row4: {
      fontSize: 12,
      borderRight: "none",
      // left, right,
      width: "33%",
      borderLeftWidth: "1",
    },
    row5: {
      fontSize: 12,
      borderLeftWidth: "1",
      // border
      // backgroundColor: 'red',
      height: "100%",
      width: "33%",
    },
  });
  /*
backgroundColor: Establece el color de fondo.
color: Establece el color del texto.
fontSize: Establece el tamaño de fuente.
fontWeight: Establece el grosor de la fuente (por ejemplo, 'bold' para negrita).
textAlign: Establece la alineación del texto.
margin: Establece los márgenes alrededor del elemento.
padding: Establece el espacio de relleno dentro del elemento.
border: Establece el estilo, ancho y color del borde.
height: Establece la altura del elemento.
width: Establece el ancho del elemento.
display: Establece el tipo de visualización ('flex', 'block', 'inline-block', etc.).
position: Establece el tipo de posicionamiento ('relative', 'absolute', 'fixed', etc.).
top, bottom, left, right: Establece la posición del elemento.
overflow: Establece el comportamiento de desbordamiento del contenido.
Estos son solo algunos ejemplos de las propiedades que se pueden utilizar en un objeto de estilo en línea en React. Puedes consultar la documentación de CSS para obtener una lista completa de todas las propiedades y sus valores posibles.

Recuerda que las propiedades deben estar en formato camelCase (por ejemplo, backgroundColor en lugar de background-color) y los valores deben ser cadenas de texto.
*/
  function formatoFecha(fechaString) {
    const fecha = new Date(fechaString);
    const dia = fecha.getDate().toString().padStart(2, "0");
    const mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
    const año = fecha.getFullYear();

    return `${dia}/${mes}/${año} `;
  }

  return (
    <Document fileName="mi-archivo.pdf">
      <Page
        size="A4"
        title={"pdfUrl"}
        style={styles.body}
        author={"Gabriel"}
        fileName="mi-archivo.pdf"
        
      >
        <Text>Informe Deudas</Text>
        <View style={styles.table}>
          <View style={[styles.row, styles.bold, styles.header]}>
            <Text style={styles.row1}>Fecha</Text>
            <Text style={styles.row1}>Nombre</Text>
            <Text style={styles.row1}>Telefono</Text>
            <Text style={styles.row1}>Descripcion</Text>
            <Text style={styles.row1}>Deuda</Text>
            <Text style={styles.row1}>Pendiente</Text>
          </View>

          {clientesEnRango().map((row) => (
            <View key={row.id} style={[styles.row, styles.row22]}>
              <View style={styles.row1}>
                <Text>{formatoFecha(row.updatedAt)}</Text>
              </View>
              <View style={styles.row1}>
                <Text>{row.nombre}</Text>
              </View>
              <View style={styles.row1}>
                <Text>{row.telefono}</Text>
              </View>
              <View style={styles.row1}>
                <Text>{row.descripcion}</Text>
              </View>
              <View style={styles.row1}>
                <Text>
                  {row.monto_total.toLocaleString("es-PY", {
                    style: "currency",
                    currency: "PYG",
                  })}
                </Text>
              </View>
              <View style={styles.row1}>
                <Text>
                  {row.deuda.toLocaleString("es-PY", {
                    style: "currency",
                    currency: "PYG",
                  })}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default DeudasPDF;
