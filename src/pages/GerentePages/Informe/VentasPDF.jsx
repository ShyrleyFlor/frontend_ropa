import React, { useEffect, useState } from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
// import { useVenta } from "../../../context/VentaContext"; // Cambiar a VentaContext
import { getVentasApi } from "../../../api/Ventas.api"; // Cambiar a Ventas.api








const InformeVentasPDF = ({ startDate, endDate }) => {
  const [ventas, setVentas] = useState(); // Cambiar a ventas

  async function getVentas() {
    // Cambiar a getVentas
    try {
      const response = await getVentasApi(); // Cambiar a getVentasApi
      setVentas(response.data);
    } catch (error) {
      console.log(error.response.data.msg);
    }
  }

  useEffect(() => {
    getVentas();
  }, []);

  const ventasEnRango = () => {
    if (!ventas) return [];
    return ventas.filter(
      (venta) =>
        new Date(venta.fecha) >= new Date(startDate) &&
        new Date(venta.fecha) <= new Date(endDate)
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
    header2: {
      backgroundColor: "#d3d3d3",
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
        encoding='utf-8'

      >
        <Text>Informe Ventas</Text>
        <View style={styles.table}>
          <View style={[styles.row, styles.bold, styles.header]}>
            <Text style={styles.row1}>Fecha</Text>
            <Text style={styles.row1}>Precio Total</Text>
            <Text style={styles.row1}>Descuento</Text>
          </View>
          {ventasEnRango().map((row) => (
            <View key={row.id}>
              <View key={row.id} style={[styles.row, styles.row22]}>
                <View style={styles.row1}>
                  <Text>{formatoFecha(row.fecha)}</Text>
                </View>
                <View style={styles.row1}>
                  <Text>
                    {row.precio_total.toLocaleString("es-PY", {
                      style: "currency",
                      currency: "PYG",
                    })}
                  </Text>
                </View>
                <View style={styles.row1}>
                  <Text>
                    {row.precio_descuento.toLocaleString("es-PY", {
                      style: "currency",
                      currency: "PYG",
                    })}
                  </Text>
                </View>
              </View>
              <View style={[styles.row, styles.bold, styles.header2]}>
                <Text style={styles.row1}>Descripcion</Text>
                <Text style={styles.row1}>Tamaño</Text>
                <Text style={styles.row1}>Tipo</Text>
                <Text style={styles.row1}>Suptipo</Text>
                <Text style={styles.row1}>Precio</Text>
                <Text style={styles.row1}>Cantidad</Text>
              </View>
              {row.productos.map((prod) => (
                <View key={prod.id} style={[styles.row, styles.row22]}>
                  <View style={styles.row1}>
                    <Text>{prod.descripcion}</Text>
                  </View>
                  <View style={styles.row1}>
                    <Text>{prod.tamanho}</Text>
                  </View>
                  <View style={styles.row1}>
                    <Text>{prod.tipo}</Text>
                  </View>
                  <View style={styles.row1}>
                    <Text>{prod.subtipo}</Text>
                  </View>
                  <View style={styles.row1}>
                    <Text>
                      {prod.precio.toLocaleString("es-PY", {
                        style: "currency",
                        currency: "PYG",
                      })}
                    </Text>
                  </View>
                  <View style={styles.row1}>
                    <Text>
                      {prod.VentasProductos.cantidad}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default InformeVentasPDF;
