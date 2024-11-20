import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker"; // Importación del nuevo Picker
import { useDispatch, useSelector } from "react-redux";
import { fetchMonedas } from "../../features/monedasSlice";
import { crearTransaccion } from "../../features/transaccionesSlice";

const CrearTransaccion = () => {
  const dispatch = useDispatch();
  const monedas = useSelector((state) => state.monedas.lista);
  const monedasStatus = useSelector((state) => state.monedas.status);
  const apiKey = useSelector((state) => state.usuario.apiKey);
  const idUsuario = useSelector((state) => state.usuario.idUsuario);

  const [tipoOperacion, setTipoOperacion] = useState("");
  const [moneda, setMoneda] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [cotizacion, setCotizacion] = useState(null);

  useEffect(() => {
    if (monedasStatus === "idle") {
      dispatch(fetchMonedas(apiKey));
    }
  }, [monedasStatus, dispatch, apiKey]);

  useEffect(() => {
    if (moneda) {
      const monedaSeleccionada = monedas.find((m) => m.id === parseInt(moneda));
      setCotizacion(monedaSeleccionada?.cotizacion || null);
    }
  }, [moneda, monedas]);

  const handleCrearTransaccion = async () => {
    if (!tipoOperacion || !moneda || !cantidad) {
      Alert.alert("Error", "Por favor completa todos los campos.");
      return;
    }

    const transaccion = {
      idUsuario,
      tipoOperacion: parseInt(tipoOperacion),
      moneda: parseInt(moneda),
      cantidad: parseFloat(cantidad),
      valorActual: cotizacion,
    };

    try {
      const response = await dispatch(crearTransaccion(transaccion)).unwrap();
      Alert.alert(
        "Éxito",
        `Transacción creada correctamente con ID: ${response.idTransaccion}`
      );
    } catch (error) {
      Alert.alert("Error", error.message || "Error al crear la transacción.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear transacción</Text>
      <Text style={styles.label}>Tipo de Operación</Text>
      <Picker
        selectedValue={tipoOperacion}
        onValueChange={(itemValue) => setTipoOperacion(itemValue)}
        style={styles.input}
      >
        <Picker.Item label="Seleccione una operación" value="" />
        <Picker.Item label="Compra" value="1" />
        <Picker.Item label="Venta" value="2" />
      </Picker>

      <Text style={styles.label}>Moneda</Text>
      {monedasStatus === "loading" ? (
        <Text style={styles.loading}>Cargando monedas...</Text>
      ) : monedas?.length > 0 ? (
        <Picker
          selectedValue={moneda}
          onValueChange={(itemValue) => setMoneda(itemValue)}
          style={styles.input}
        >
          <Picker.Item label="Seleccione una moneda" value="" />
          {monedas.map((mon) => (
            <Picker.Item key={mon.id} label={mon.nombre} value={mon.id} />
          ))}
        </Picker>
      ) : (
        <Text style={styles.error}>
          No se pudieron cargar las monedas. Intente nuevamente.
        </Text>
      )}

      <Text style={styles.cotizacion}>
        Valor actual en UYU: {cotizacion !== null ? cotizacion : "Seleccionar moneda"}
      </Text>


      <Text style={styles.label}>Cantidad</Text>
      <TextInput
        placeholder="Ingrese la cantidad"
        placeholderTextColor="#cbcbcb"
        value={cantidad}
        onChangeText={(text) => setCantidad(text.replace(/[^0-9.]/g, ""))} // Solo números
        style={styles.input}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={handleCrearTransaccion}>
        <Text style={styles.buttonText}>Crear</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flexstart",
    padding: 20,
    backgroundColor: "#141519",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#e3e553",
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#cccf1f",
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "#454649",
    borderWidth: 1,
    marginBottom: 30,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "#242529",
    color: "#fff",
  },
  button: {
    backgroundColor: "#e3e553",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    color: "#141519",
    fontWeight: "bold",
  },
  loading: {
    color: "#e3e553",
    fontStyle: "italic",
    marginBottom: 10,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
  cotizacion: {
    color: "#ffffff",
    marginBottom: 30,
    fontSize: 16,
    fontStyle: "bold",
  },
});

export default CrearTransaccion;
