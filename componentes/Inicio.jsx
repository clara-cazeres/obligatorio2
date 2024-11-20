import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

const Inicio = () => {
  const username = useSelector((state) => state.usuario.username);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido, {username || 'Usuario'}</Text>
      <Text style={styles.subtitle}>Esta es la pantalla de inicio</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#141519',
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
  },
});

export default Inicio;
