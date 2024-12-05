import React, { useState } from 'react';
import { View, Text, StyleSheet, Picker } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { useSelector } from 'react-redux';

const GraficaMoneda = () => {
  const transacciones = useSelector((state) => state.transacciones.lista);
  const monedas = useSelector((state) => state.monedas.lista);

  const [monedaSeleccionada, setMonedaSeleccionada] = useState(''); 

  // filtro monedas con al menos una transacción
  const monedasConTransacciones = monedas.filter(moneda =>
    transacciones.some(transaccion => transaccion.moneda === moneda.id)
  );

  // filtro transacciones hechas por la moneda seleccionada
  const transaccionesFiltradas = transacciones.filter(
    (transaccion) => transaccion.moneda === parseInt(monedaSeleccionada)
  );

  // cotizaciones de transacciones filtradas
  const cotizaciones = transaccionesFiltradas.map((transaccion) => transaccion.valorActual);
  const fechas = transaccionesFiltradas.map((_, index) => `Transacción ${index + 1}`);

  // datos gráfica
  const data = {
    labels: fechas,
    datasets: [
      {
        data: cotizaciones,
        color: (opacity = 1) => `rgba(185, 136, 242, ${opacity})`, 
        strokeWidth: 1, 
      },
    ],
  };

  const chartConfig = {
    backgroundColor: '#242529',
    backgroundGradientFrom: '#242529',
    backgroundGradientTo: '#242529',
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cotización por Moneda</Text>
      <Text style={styles.description}>
        En este gráfico se muestra la cotización de las criptomonedas al momento que se realizaron las transacciones.
      </Text>
      <Text style={styles.subtitle}>Selecciona una moneda</Text>
      <Picker
        selectedValue={monedaSeleccionada}
        onValueChange={(itemValue) => setMonedaSeleccionada(itemValue)}
        style={styles.picker}
      >
        {monedasConTransacciones.length === 0 ? (
          <Picker.Item label="No hay transacciones todavía" value="" />
        ) : (
          <>
            <Picker.Item label="Seleccione una moneda" value="" />
            {monedasConTransacciones.map((moneda) => (
              <Picker.Item key={moneda.id} label={moneda.nombre} value={moneda.id.toString()} />
            ))}
          </>
        )}
      </Picker>

      {monedaSeleccionada && transaccionesFiltradas.length > 0 ? (
        <View>
          <Text style={styles.chartTitle}>
            Cotizaciones de{' '}
            {monedas.find((moneda) => moneda.id === parseInt(monedaSeleccionada))?.nombre}
          </Text>
          <LineChart
            data={data}
            width={Dimensions.get('window').width - 40} 
            height={220}
            chartConfig={chartConfig}
            bezier 
            style={styles.chart}
          />
        </View>
      ) : (
        monedaSeleccionada && <Text style={styles.noDataText}>No hay transacciones para esta moneda.</Text>
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
  description: {
    fontSize: 14,
    color: '#ffffff',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#cccccc',
    marginBottom: 10,
    textAlign: 'center',
  },
  picker: {
    backgroundColor: '#141519',
    color: '#ffffff',
    marginBottom: 20,
    borderRadius: 5,
  },
  chartTitle: {
    fontSize: 16,
    color: '#e3e553',
    marginBottom: 10,
    textAlign: 'center',
  },
  noDataText: {
    fontSize: 14,
    color: '#ffffff',
    textAlign: 'center',
    marginTop: 20,
  },
  chart: {
    marginVertical: 10,
    borderRadius: 10,
  },
});

export default GraficaMoneda;
