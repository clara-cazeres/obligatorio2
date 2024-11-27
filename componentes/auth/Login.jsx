import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { loguear } from '../../features/usuarioSlice';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importar AsyncStorage

const Login = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Error", "Por favor completa todos los campos.");
      return;
    }
  
    try {
      const response = await fetch("https://crypto.develotion.com/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario: username, password }),
      });
  
      const data = await response.json();
  
      if (response.ok && data.codigo === 200) {
        const { apiKey, id } = data;
  
        //datos en redux
        dispatch(loguear({ apiKey, username, idUsuario: id }));
  
        //datos en AsyncStorage
        await AsyncStorage.setItem('apiKey', apiKey);
        await AsyncStorage.setItem('username', username);
        await AsyncStorage.setItem('idUsuario', id.toString());
  
        Alert.alert("Inicio exitoso", "Bienvenido, " + username);
        navigation.navigate('Aplicacion');
        console.log(navigation.getState());

      } else {
        Alert.alert("Error", data.mensaje || "Error al iniciar sesión.");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      Alert.alert("Error", "Error en la conexión: " + error.message);
    }
  };

  const irRegistro = () => {
    navigation.push('Registro');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <TextInput
        placeholder="Usuario"
        placeholderTextColor="#cbcbcb"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Contraseña"
        placeholderTextColor="#cbcbcb"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Ingresar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.link} onPress={irRegistro}>
        <Text style={styles.linkText}>¿No tienes una cuenta? Regístrate aquí</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flexstart',
    padding: 20,
    backgroundColor: '#141519', 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e3e553', 
    textAlign: 'center',
    marginBottom: 30,
    marginTop: 50,
  },
  input: {
    height: 40,
    borderColor: '#454649', 
    borderWidth: 1,
    marginBottom: 30,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#242529', 
    color: '#fff',
  },
  button: {
    backgroundColor: '#e3e553', 
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#141519', 
    fontWeight: 'bold',
    fontSize: 18,
  },
  link: {
    marginTop: 15,
    alignItems: 'center',
  },
  linkText: {
    color: '#e3e553', 
    textDecorationLine: 'underline',
  },
});

export default Login;
