import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import { globalStyles, chartStyles } from '../../styles/styles';

const GraficaVentas = () => {
  const transacciones = useSelector((state) => state.transacciones.lista);
  const monedas = useSelector((state) => state.monedas.lista);

  const ventasPorMoneda = transacciones.reduce((acc, transaccion) => {
    if (transaccion.tipoOperacion === 2) {
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

  // datos gráfica
  const chartData = Object.keys(ventasPorMoneda).map((nombreMoneda, index) => ({
    name: nombreMoneda,
    cantidad: ventasPorMoneda[nombreMoneda],
    color: `rgba(${(index * 100) % 255}, ${(index * 50) % 255}, ${(index * 150) % 255}, 1)`,
    legendFontColor: '#FFF',
    legendFontSize: 14,
  }));

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Montos Vendidos por Moneda</Text>
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



export default GraficaVentas;
