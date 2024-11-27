import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

const InversionTotal = () => {
  const transacciones = useSelector((state) => state.transacciones.lista);

  let totalCompra = 0;
  let totalVenta = 0;

  transacciones.forEach((transaccion) => {
    if (transaccion.tipoOperacion === 1) {
      totalCompra += transaccion.cantidad * transaccion.valorActual;
    } else if (transaccion.tipoOperacion === 2) {
      totalVenta += transaccion.cantidad * transaccion.valorActual;
    }
  });

  const totalInversion = totalCompra - totalVenta;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Monto Total de Inversiones</Text>
      <Text
        style={[
          styles.total,
          { color: totalInversion >= 0 ? "#28a745" : "#dc3545" }, // color segun monto
        ]}
      >
        ${totalInversion.toLocaleString("es-UY")}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#141519",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#e3e553",
    marginBottom: 10,
  },
  total: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default InversionTotal;
