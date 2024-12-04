import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMonedas } from '../features/monedasSlice';
import { fetchTransacciones } from '../features/transaccionesSlice';
import { useNavigation } from '@react-navigation/native';

const Inicio = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const monedas = useSelector((state) => state.monedas.lista);
  const transacciones = useSelector((state) => state.transacciones.lista);
  const idUsuario = useSelector((state) => state.usuario.idUsuario);
  const apiKey = useSelector((state) => state.usuario.apiKey);

  // Verificar datos en consola
  console.log("Transacciones en Inicio:", transacciones);
  console.log("Monedas en Inicio:", monedas);

  useEffect(() => {
    if (monedas.length === 0) {
      dispatch(fetchMonedas(apiKey));
    }
    if (monedas.length > 0) {
      dispatch(fetchTransacciones({ idUsuario, apiKey }));
    }
  }, [dispatch, monedas, apiKey, idUsuario]);

  const getNombreMoneda = (idMoneda) => {
    const moneda = monedas.find((m) => m.id === idMoneda);
    console.log("Moneda encontrada:", moneda);
    return moneda ? moneda.nombre : 'Moneda no disponible';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido a la App</Text>
      <Text style={styles.subtitle}>Resumen de las últimas transacciones:</Text>

      {transacciones.length === 0 ? (
        <Text style={styles.empty}>No hay transacciones registradas.</Text>
      ) : (
        <FlatList
          data={transacciones.slice(0, 3)}
          keyExtractor={(item, index) =>
            item.idTransaccion?.toString() || index.toString()
          }
          renderItem={({ item }) => (
            <View style={styles.transaccion}>
              <Text style={styles.tipo}>
                {item.tipoOperacion === 1 ? 'Compra' : 'Venta'} -{' '}
                {getNombreMoneda(item.moneda)}
              </Text>
              <Text style={styles.cantidad}>Cantidad: {item.cantidad}</Text>
              <Text style={styles.valor}>Valor: $ {item.valorActual}</Text>
            </View>
          )}
        />
      )}

      <Button
        title="Crear Transacción"
        color="#e3e553"
        onPress={() => navigation.navigate('Crear Transacción')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#141519',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e3e553',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#ffffff',
    marginBottom: 20,
  },
  empty: {
    fontSize: 14,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 20,
  },
  transaccion: {
    backgroundColor: '#242529',
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
    width: '100%',
  },
  tipo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e3e553',
    marginBottom: 5,
  },
  cantidad: {
    fontSize: 16,
    color: '#ffffff',
    marginBottom: 5,
  },
  valor: {
    fontSize: 16,
    color: '#ffffff',
    marginBottom: 5,
  },
});

export default Inicio;
