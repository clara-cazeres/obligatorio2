import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Inicio from './Inicio';
import GraficaVentas from './funcionalidades/GraficaVentas';
import GraficaCompras from './funcionalidades/GraficaCompras';
import GraficaMonedas from './funcionalidades/GraficaMonedas';
import CrearTransaccion from './funcionalidades/CrearTransaccion';
import ListadoTransacciones from './funcionalidades/ListadoTransacciones';
import InversionTotal from './funcionalidades/InversionTotal';
import SugerenciaOperacion from './funcionalidades/SugerenciaOperacion';
import CustomDrawerContent from './drawer/CustomDrawerContent'; 

const Drawer = createDrawerNavigator();

const Aplicacion = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Inicio"
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#242529',
        },
        drawerActiveTintColor: '#e3e553',
        drawerInactiveTintColor: '#ffffff',
        drawerLabelStyle: {
          fontSize: 16,
        },
        headerStyle: {
          backgroundColor: '#141519',
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Inicio" component={Inicio} />
      <Drawer.Screen name="Crear Transacción" component={CrearTransaccion} />
      <Drawer.Screen name="Listado de Transacciones" component={ListadoTransacciones} />
      <Drawer.Screen name="Inversión Total" component={InversionTotal} />
      <Drawer.Screen name="Sugerencia de Operación" component={SugerenciaOperacion} />
      <Drawer.Screen name="Gráfica Ventas" component={GraficaVentas} />
      <Drawer.Screen name="Gráfica Compras" component={GraficaCompras} />
      <Drawer.Screen name="Gráfica Monedas" component={GraficaMonedas} />
    </Drawer.Navigator>
  );
};

export default Aplicacion;
