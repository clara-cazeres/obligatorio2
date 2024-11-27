import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Picker } from "@react-native-picker/picker"; // Nueva importación
import { useDispatch } from 'react-redux';
import { loguear } from '../../features/usuarioSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Registro = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [departamentos, setDepartamentos] = useState([]);
  const [ciudades, setCiudades] = useState([]);
  const [departamento, setDepartamento] = useState('');
  const [ciudad, setCiudad] = useState('');
  const dispatch = useDispatch();

  // fetch departamentos
  useEffect(() => {
    const fetchDepartamentos = async () => {
      try {
        const response = await fetch('https://crypto.develotion.com/departamentos.php', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json();
        if (response.ok && data.codigo === 200) {
          setDepartamentos(data.departamentos);
        } else {
          Alert.alert('Error', data.mensaje || 'Error al obtener departamentos.');
        }
      } catch (error) {
        Alert.alert('Error', 'Error en la conexión: ' + error.message);
      }
    };
    fetchDepartamentos();
  }, []);

  // fetch ciudades
  useEffect(() => {
    if (!departamento) return;

    const fetchCiudades = async () => {
      try {
        const response = await fetch(
          `https://crypto.develotion.com/ciudades.php?idDepartamento=${departamento}`,
          {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          }
        );
        const data = await response.json();
        if (response.ok && data.codigo === 200) {
          setCiudades(data.ciudades);
        } else {
          Alert.alert('Error', data.mensaje || 'Error al obtener ciudades.');
        }
      } catch (error) {
        Alert.alert('Error', 'Error en la conexión: ' + error.message);
      }
    };
    fetchCiudades();
  }, [departamento]);

  // menajo de registro
  const handleRegister = async () => {
    if (!username || !password || !departamento || !ciudad) {
      Alert.alert("Error", "Por favor completa todos los campos.");
      return;
    }

    try {
      const response = await fetch("https://crypto.develotion.com/usuarios.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          usuario: username,
          password,
          idDepartamento: parseInt(departamento),
          idCiudad: parseInt(ciudad),
        }),
      });

      const data = await response.json();

      if (response.ok && data.codigo === 200) {
        const { apiKey, id } = data;

        // actualiza el estado global
        dispatch(loguear({ apiKey, username, idUsuario: id }));

        // guardar en AsyncStorage
        await AsyncStorage.setItem('apiKey', apiKey);
        await AsyncStorage.setItem('username', username);
        await AsyncStorage.setItem('idUsuario', id.toString());

        Alert.alert("Registro exitoso", "Usuario registrado correctamente.");
        navigation.navigate("Login");
      } else if (response.status === 409) {
        Alert.alert("Error", "El usuario ya existe. Por favor, elige otro nombre de usuario.");
      } else {
        Alert.alert("Error", data.mensaje || "Error al registrar usuario.");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      Alert.alert("Error", "Error en la conexión: " + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>
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
      <Text style={styles.label}></Text>
      <Picker
        selectedValue={departamento}
        onValueChange={(value) => setDepartamento(value)}
        style={styles.picker}
      >
        <Picker.Item label="Seleccione un departamento" value="" />
        {departamentos.map((dept) => (
          <Picker.Item key={dept.id} label={dept.nombre} value={dept.id} />
        ))}
      </Picker>
      <Text style={styles.label}></Text>
      <Picker
        selectedValue={ciudad}
        onValueChange={(value) => setCiudad(value)}
        style={styles.picker}
        enabled={!!departamento}
      >
        <Picker.Item label="Seleccione una ciudad" value="" />
        {ciudades.map((city) => (
          <Picker.Item key={city.id} label={city.nombre} value={city.id} />
        ))}
      </Picker>
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.link} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.linkText}>¿Ya tienes una cuenta? Inicia sesión</Text>
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
  picker: {
    height: 40,
    color: '#fff',
    backgroundColor: '#242529',
    marginBottom: 30,
    borderColor: '#454649', 
    borderWidth: 1,
    borderRadius: 5,
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

export default Registro;


