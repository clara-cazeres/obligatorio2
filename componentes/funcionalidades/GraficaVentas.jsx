import React from 'react';
import { View, Text } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import { commonStyles } from '../../styles/styles';

const GraficaVentas = () => {
  const transacciones = useSelector((state) => state.transacciones.lista);
  const monedas = useSelector((state) => state.monedas.lista);

  // Agrupar ventas por moneda
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

  // Preparar datos para la gráfica
  const chartData = Object.keys(ventasPorMoneda).map((nombreMoneda, index) => ({
    name: nombreMoneda,
    cantidad: ventasPorMoneda[nombreMoneda],
    color: `rgba(${(index * 100) % 255}, ${(index * 50) % 255}, ${(index * 150) % 255}, 1)`,
    legendFontColor: '#FFF',
    legendFontSize: 12,
  }));

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.title}>Montos Vendidos por Moneda</Text>
      {chartData.length > 0 ? (
        <PieChart
          data={chartData}
          width={Dimensions.get('window').width - 30} // Ajuste dinámico del ancho
          height={220}
          chartConfig={{
            backgroundColor: '#1c1c1e',
            backgroundGradientFrom: '#1c1c1e',
            backgroundGradientTo: '#1c1c1e',
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          }}
          accessor="cantidad"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      ) : (
        <Text style={commonStyles.text}>No hay datos de ventas disponibles.</Text>
      )}
    </View>
  );
};

export default GraficaVentas;
