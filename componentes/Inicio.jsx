import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMonedas } from '../features/monedasSlice';
import { fetchTransacciones } from '../features/transaccionesSlice';
import { useNavigation } from '@react-navigation/native';
import { obtenerSugerencias } from '../componentes/funcionalidades/utils/SugerenciaOperacionesComponent';
import { globalStyles } from '../styles/styles';

const Inicio = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const monedas = useSelector((state) => state.monedas.lista);
  const transacciones = useSelector((state) => state.transacciones.lista);
  const idUsuario = useSelector((state) => state.usuario.idUsuario);
  const apiKey = useSelector((state) => state.usuario.apiKey);
  const nombreUsuario = useSelector((state) => state.usuario.username); 

  console.log('nombre usuario:', nombreUsuario);

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
    return moneda ? moneda.nombre : 'Moneda no disponible';
  };

  const transaccionesOrdenadas = [...transacciones].sort((a, b) => b.id - a.id);
  const sugerencias = obtenerSugerencias(transacciones, monedas).slice(0, 2);

  return (
    <ScrollView style={globalStyles.container}>
      <Text style={globalStyles.title}>Bienvenido/a {nombreUsuario}</Text>

      <View style={styles.seccion}>
      <Text style={styles.subtitle}>Últimas transacciones:</Text>
        {transaccionesOrdenadas.length === 0 ? (
       <Text style={globalStyles.empty}>No hay transacciones registradas.</Text>
      ) : (
      <View>
        {transaccionesOrdenadas.slice(0, 2).map((item, index) => (
        <View key={item.id || index} style={globalStyles.card}>
          <Text style={globalStyles.cardtitle}>
            {item.tipoOperacion === 1 ? 'Compra de:' : 'Venta de:'}{' '}
            {getNombreMoneda(item.moneda)}
          </Text>
           <Text style={globalStyles.text}>Cantidad: {item.cantidad}</Text>
          </View>
          ))}
      </View>
  )}
  <TouchableOpacity
    style={globalStyles.button}
    onPress={() => navigation.navigate('Listado de Transacciones')}
  >
    <Text style={globalStyles.buttonText}>Ver Transacciones</Text>
  </TouchableOpacity>
</View>


      <View style={styles.seccion}>
        <Text style={styles.subtitle}>Sugerencias de Operaciones:</Text>
        {sugerencias.length === 0 ? (
          <Text style={globalStyles.empty}>No hay sugerencias disponibles.</Text>
        ) : (
          <FlatList
            data={sugerencias}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <Text style={styles.suggestion}>{item}</Text>
            )}
          />
        )}
      </View>
  
      <TouchableOpacity
        style={globalStyles.button}
        onPress={() => navigation.navigate('Crear Transacción')}
      >
        <Text style={globalStyles.buttonText}>Crear Transacción</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  seccion: {
    padding: 10,
    backgroundColor: '#303136',
    marginBottom: 20, 
    borderRadius: 8,
  },
  subtitle: {
    textTransform: 'uppercase',
    fontSize: 16,
    color: '#f7f7f7',
    marginBottom: 20,
    textAlign: 'left',
  },
  suggestion: {
    fontSize: 16,
    color: '#00bcd4',
    marginBottom: 10,
  },
});

export default Inicio;
