import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const ListadoTransacciones = () => {
  // Ejemplo de transacciones para pruebas
  const transacciones = [
    { id: 1, tipo: 'Compra', moneda: 'Bitcoin', cantidad: 0.5, valor: 30000 },
    { id: 2, tipo: 'Venta', moneda: 'Ethereum', cantidad: 1, valor: 2000 },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Listado de Transacciones</Text>
      <FlatList
        data={transacciones}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.transaccion}>
            <Text style={styles.texto}>{`${item.tipo} - ${item.moneda}`}</Text>
            <Text style={styles.texto}>{`Cantidad: ${item.cantidad}`}</Text>
            <Text style={styles.texto}>{`Valor: $${item.valor}`}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#242529',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#e3e553',
    marginBottom: 10,
  },
  transaccion: {
    backgroundColor: '#141519',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  texto: {
    color: '#ffffff', 
    fontSize: 16,
  },
});

export default ListadoTransacciones;
