import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useSelector } from "react-redux";

const OperacionSugerida = () => {
  const transacciones = useSelector((state) => state.transacciones.lista);
  const monedas = useSelector((state) => state.monedas.lista);

  const ultimaTransaccionPorMoneda = {};

  transacciones.forEach((transaccion) => {
    const monedaId = transaccion.moneda;

    if (
      !ultimaTransaccionPorMoneda[monedaId] ||
      transaccion.idTransaccion > ultimaTransaccionPorMoneda[monedaId].idTransaccion
    ) {
      ultimaTransaccionPorMoneda[monedaId] = transaccion;
    }
  });

  const sugerencias = [];

  Object.keys(ultimaTransaccionPorMoneda).forEach((monedaId) => {
    const transaccion = ultimaTransaccionPorMoneda[monedaId];
    const monedaActual = monedas.find((mon) => mon.id === parseInt(monedaId));

    if (monedaActual) {
      const valorActual = monedaActual.cotizacion;
      const valorTransaccion = transaccion.valorActual;

      if (transaccion.tipoOperacion === 1 && valorActual > valorTransaccion) {
        sugerencias.push(`Vender ${monedaActual.nombre}`);
      }

      if (transaccion.tipoOperacion === 2 && valorActual < valorTransaccion) {
        sugerencias.push(`Comprar ${monedaActual.nombre}`);
      }
    }
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sugerencia de Operaciones</Text>
      <Text style={styles.subtitle}>
        Basado en la última transacción y el valor actual de las monedas, te sugerimos:
      </Text>
      {sugerencias.length > 0 ? (
        <FlatList
          data={sugerencias}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <Text style={styles.suggestion}>{item}</Text>}
        />
      ) : (
        <Text style={styles.noSuggestions}>No hay sugerencias disponibles en este momento.</Text>
      )}
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
  subtitle: {
    fontSize: 16,
    color: "#cccccc",
    marginBottom: 10,
  },
  suggestion: {
    fontSize: 16,
    color: "#00bcd4",
    marginBottom: 5,
  },
  noSuggestions: {
    fontSize: 16,
    color: "#cccccc",
    fontStyle: "italic",
  },
});

export default OperacionSugerida;
