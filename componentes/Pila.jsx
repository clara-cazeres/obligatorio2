import { View, Text } from 'react-native'
import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'
import Login from './auth/Login'
import Registro from './auth/Registro'
import Aplicacion from './Aplicacion';

const Stack = createStackNavigator()


const Pila = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Registro"
        component={Registro}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Aplicacion"
        component={Aplicacion}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

export default Pila