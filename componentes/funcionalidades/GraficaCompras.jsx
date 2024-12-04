import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { useSelector } from 'react-redux';
import { commonStyles, chartStyles } from '../../styles/styles';

const GraficaCompras = () => {
  const transacciones = useSelector((state) => state.transacciones.lista);
  const monedas = useSelector((state) => state.monedas.lista);

  const comprasPorMoneda = transacciones.reduce((acc, transaccion) => {
    if (transaccion.tipoOperacion === 1) {
      const moneda = monedas.find((mon) => mon.id === transaccion.moneda);
      if (moneda) {
        acc[moneda.nombre] = (acc[moneda.nombre] || 0) + transaccion.cantidad * transaccion.valorActual;
      }
    }
    return acc;
  }, {});

  const chartData = Object.keys(comprasPorMoneda).map((nombre, index) => ({
    name: nombre,
    cantidad: comprasPorMoneda[nombre],
    color: `rgba(${(index * 50) % 255}, ${(index * 100) % 255}, 200, 1)`,
    legendFontColor: commonStyles.text.color,
    legendFontSize: 12,
  }));

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.title}>Montos Comprados por Moneda</Text>
      {chartData.length > 0 ? (
        <>
          <PieChart
            data={chartData}
            width={Dimensions.get('window').width - 30}
            height={220}
            chartConfig={chartStyles.chartConfig}
            accessor="cantidad"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
          <View style={styles.legend}>
            {chartData.map((item, index) => (
              <Text key={index} style={commonStyles.text}>
                {item.name}: {item.cantidad.toFixed(2)}
              </Text>
            ))}
          </View>
        </>
      ) : (
        <Text style={commonStyles.text}>No hay datos para mostrar.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  legend: {
    marginTop: 20,
  },
});

export default GraficaCompras;
