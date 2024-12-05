import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useSelector } from "react-redux";
import { obtenerSugerencias } from "./utils/SugerenciaOperacionesComponent";
import { globalStyles } from "../../styles/styles";

const OperacionSugerida = () => {
  const transacciones = useSelector((state) => state.transacciones.lista);
  const monedas = useSelector((state) => state.monedas.lista);

  const sugerencias = obtenerSugerencias(transacciones, monedas);

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Sugerencia de Operaciones</Text>
      <Text style={globalStyles.subtitle}>
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
