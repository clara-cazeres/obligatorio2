import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const GraficaVentas = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gráfica de Ventas</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default GraficaVentas;
