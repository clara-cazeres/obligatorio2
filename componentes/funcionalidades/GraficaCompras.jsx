import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { useSelector } from "react-redux";

const GraficaCompras = () => {
  const transacciones = useSelector((state) => state.transacciones.lista);
  const monedas = useSelector((state) => state.monedas.lista);

  const comprasPorMoneda = transacciones.reduce((acc, transaccion) => {
    if (transaccion.tipoOperacion === 1) { 
      const moneda = monedas.find((moneda) => moneda.id === transaccion.moneda);
      if (moneda) {
        if (!acc[moneda.nombre]) {
          acc[moneda.nombre] = 0;
        }
        acc[moneda.nombre] += transaccion.cantidad * transaccion.valorActual;
      }
    }
    return acc;
  }, {});

  //  datos gráfica
  const chartData = Object.keys(comprasPorMoneda).map((nombreMoneda, index) => ({
    name: nombreMoneda,
    amount: comprasPorMoneda[nombreMoneda],
    color: `rgba(${(index * 50) % 255}, ${(index * 100) % 255}, 200, 1)`,
    legendFontColor: "#ffffff",
    legendFontSize: 12,
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Montos Comprados por Moneda</Text>
      {chartData.length > 0 ? (
        <PieChart
          data={chartData}
          width={Dimensions.get("window").width - 30} 
          height={220} 
          chartConfig={{
            backgroundColor: "#141519",
            backgroundGradientFrom: "#141519",
            backgroundGradientTo: "#141519",
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          }}
          accessor="amount"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute 
        />
      ) : (
        <Text style={styles.emptyMessage}>
          No hay datos de compra para mostrar.
        </Text>
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
    fontSize: 18,
    fontWeight: "bold",
    color: "#e3e553",
    marginBottom: 10,
    textAlign: "center",
  },
  emptyMessage: {
    color: "#ffffff",
    textAlign: "center",
    marginTop: 20,
  },
});

export default GraficaCompras;
