import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Platform } from 'react-native';

import { Provider, useDispatch } from 'react-redux';
import { store } from './store/store';
import { NavigationContainer } from '@react-navigation/native';
import Pantallas from './componentes/Pantallas';
import { loguear } from './features/usuarioSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AppContent = () => {
  const dispatch = useDispatch();

  // restaurar sesion
  useEffect(() => {
    const restaurarSesion = async () => {
      try {
        const apiKey = await AsyncStorage.getItem('apiKey');
        const username = await AsyncStorage.getItem('username');
        const idUsuario = await AsyncStorage.getItem('idUsuario');

        if (apiKey && username && idUsuario) {
          dispatch(loguear({ apiKey, username, idUsuario }));
        }
      } catch (error) {
        console.error('Error al restaurar la sesión:', error);
      }
    };

    restaurarSesion();
  }, [dispatch]);

  return (
    <NavigationContainer>
      <Pantallas />
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <AppContent />
        <StatusBar style="auto" />
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingTop: Platform.OS === 'ios' ? 35 : 0,
    backgroundColor: '#fff',
  },
});
