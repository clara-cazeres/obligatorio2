import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { useSelector } from 'react-redux';

const GraficaVentas = () => {
  const transacciones = useSelector((state) => state.transacciones.lista);
  const monedas = useSelector((state) => state.monedas.lista);

  // Calcular montos de venta por moneda
  const ventasPorMoneda = transacciones.reduce((acc, transaccion) => {
    if (transaccion.tipoOperacion === 2) { 
      const moneda = monedas.find(moneda => moneda.id === transaccion.moneda);
      if (moneda) {
        if (!acc[moneda.nombre]) {
          acc[moneda.nombre] = 0;
        }
        acc[moneda.nombre] += transaccion.cantidad * transaccion.valorActual;
      }
    }
    return acc;
  }, {});

  // Datos para la gráfica
  const labels = Object.keys(ventasPorMoneda);
  const data = Object.values(ventasPorMoneda);

  const chartData = labels.map((label, index) => ({
    name: label,
    cantidad: data[index],
    color: [
      'rgb(255, 179, 180)',
      'rgb(242, 75, 77)',
      'rgb(227, 229, 83)',
      'rgb(128, 227, 98)',
      'rgb(98, 198, 237)',
      'rgb(157, 130, 245)',
    ][index % 6],
    legendFontColor: '#FFF',
    legendFontSize: 12,
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Montos Vendidos por Moneda</Text>
      {chartData.length > 0 ? (
        <PieChart
          data={chartData}
          width={Dimensions.get('window').width - 40} // Ancho dinámico
          height={220}
          chartConfig={{
            backgroundColor: '#1c1c1e',
            backgroundGradientFrom: '#1c1c1e',
            backgroundGradientTo: '#1c1c1e',
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          }}
          accessor="cantidad"
          backgroundColor="transparent"
          paddingLeft="15"
          center={[10, 0]}
          absolute
        />
      ) : (
        <Text style={styles.emptyText}>No hay datos de ventas disponibles.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#242529',
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e3e553',
    marginBottom: 10,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: '#ffffff',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default GraficaVentas;
