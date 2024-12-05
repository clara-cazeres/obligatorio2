import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { useSelector } from 'react-redux';
import { globalStyles, chartStyles } from '../../styles/styles';

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
    legendFontColor: globalStyles.text.color,
    legendFontSize: 12,
  }));

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Montos Comprados por Moneda</Text>
      {chartData.length > 0 ? (
        <>
          <PieChart
             data={chartData}
             width={Dimensions.get('window').width + 0}
             height={220}
             hasLegend={false}
             chartConfig={chartStyles.chartConfig}
             accessor="cantidad"
             backgroundColor="transparent"
             paddingLeft="15"
             absolute
          />
          {/* leyenda personalizada */}
          <View style={chartStyles.legendContainer}>
            {chartData.map((item, index) => (
              <View key={index} style={chartStyles.legendItem}>
                <View
                  style={[chartStyles.colorBox, { backgroundColor: item.color }]}
                />
                <Text style={chartStyles.legendText}>
                  {item.name}: {item.cantidad.toFixed(2)}
                </Text>
              </View>
            ))}
          </View>
        </>
      ) : (
        <Text style={globalStyles.text}>No hay datos de ventas disponibles.</Text>
      )}
    </View>
  );
};
export default GraficaCompras;
