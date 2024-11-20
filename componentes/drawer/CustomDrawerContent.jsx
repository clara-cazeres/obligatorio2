import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useDispatch, useSelector } from 'react-redux';
import { desloguear } from '../../features/usuarioSlice';

const CustomDrawerContent = (props) => {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.usuario.username);

  const cerrarSesion = () => {
    dispatch(desloguear());
  };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.container}>
      {/* Encabezado con título */}
      <View style={styles.header}>
        <Text style={styles.title}>Bitwise</Text>
      </View>

      {/* Opciones de navegación */}
      <View style={styles.menu}>
        <DrawerItemList {...props} />
      </View>

      {/* Footer con usuario y botón de cerrar sesión */}
      <View style={styles.footer}>
        <Text style={styles.username}>Usuario: {username || 'No identificado'}</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={cerrarSesion}>
          <Text style={styles.logoutText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#242529',
  },
  header: {
    backgroundColor: '#141519',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e3e553',
  },
  title: {
    color: '#e3e553',
    fontSize: 20,
    fontWeight: 'bold',
  },
  menu: {
    flex: 1,
    marginTop: 10,
  },
  footer: {
    padding: 16,
      borderTopWidth: 1,
      borderTopColor: '#e3e553',
      backgroundColor: '#141519',
  },
  username: {
    color: '#ffffff',
    fontSize: 16,
    marginBottom: 10,
  },
  logoutButton: {
    backgroundColor: '#e3e553',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  logoutText: {
    color: '#141519',
    fontWeight: 'bold',
  },
});

export default CustomDrawerContent;

