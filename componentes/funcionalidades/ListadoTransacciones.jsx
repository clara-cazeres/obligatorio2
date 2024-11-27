import React, { useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransacciones } from "../../features/transaccionesSlice";
import { fetchMonedas } from "../../features/monedasSlice";
import dayjs from "dayjs";

const ListadoTransacciones = () => {
  const dispatch = useDispatch();
  const transacciones = useSelector((state) => state.transacciones.lista);
  const monedas = useSelector((state) => state.monedas.lista);
  const idUsuario = useSelector((state) => state.usuario.idUsuario);
  const apiKey = useSelector((state) => state.usuario.apiKey);

  useEffect(() => {
    if (monedas.length === 0) {
      dispatch(fetchMonedas(apiKey));
    }
    if (monedas.length > 0) {
      dispatch(fetchTransacciones({ idUsuario, apiKey }));
    }
  }, [dispatch, idUsuario, apiKey, monedas]);

  const getNombreMoneda = (idMoneda) => {
    console.log("ID de moneda recibido:", idMoneda);
    console.log("Lista de monedas disponible:", monedas);
    const moneda = monedas.find((m) => m.id === idMoneda);
    if (!moneda) {
      console.warn(`Moneda con ID ${idMoneda} no encontrada.`);
    }
    return moneda ? moneda.nombre : "Moneda no disponible";
  };

  const formatFecha = (fechaISO) => {
    console.log("Valor recibido por formatFecha:", fechaISO);
    try {
      const formattedDate = dayjs(fechaISO).format("DD/MM/YYYY");
      console.log("Fecha formateada:", formattedDate);
      return formattedDate;
    } catch (error) {
      console.error("Error en formatFecha:", error);
      return "Fecha no válida";
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis transacciones</Text>
      {transacciones.length === 0 ? (
        <Text style={styles.empty}>No hay transacciones registradas.</Text>
      ) : (
        <FlatList
          data={transacciones}
          keyExtractor={(item, index) =>
            item.idTransaccion?.toString() || index.toString()
          }
          renderItem={({ item }) => {
            console.log("Transacción actual:", item);
            return (
              <View style={styles.transaccion}>
                <Text style={styles.tipo}>
                  {item.tipoOperacion === 1 ? "Compra" : "Venta"} -{" "}
                  {getNombreMoneda(item.moneda)}
                </Text>
                <Text style={styles.cantidad}>Cantidad: {item.cantidad}</Text>
                <Text style={styles.valor}>Valor: $ {item.valorActual}</Text>
                <Text style={styles.fecha}>
                  Fecha: {item.fecha ? formatFecha(item.fecha) : "Sin fecha"}
                </Text>
              </View>
            );
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#242529",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#e3e553",
    marginBottom: 20,
    textAlign: "center",
  },
  empty: {
    color: "#ffffff",
    textAlign: "center",
  },
  transaccion: {
    backgroundColor: "#141519",
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
  },
  tipo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#e3e553",
    marginBottom: 5,
  },
  cantidad: {
    fontSize: 16,
    color: "#ffffff",
    marginBottom: 5,
  },
  valor: {
    fontSize: 16,
    color: "#ffffff",
    marginBottom: 5,
  },
  fecha: {
    fontSize: 14,
    color: "#cccccc",
    marginTop: 5,
  },
});

export default ListadoTransacciones;
