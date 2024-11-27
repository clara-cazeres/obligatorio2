import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

// crear una transacción
export const crearTransaccion = createAsyncThunk(
  "transacciones/crearTransaccion",
  async (transaccion, { getState, rejectWithValue }) => {
    const { apiKey } = getState().usuario;
    try {
      const fechaCreacion = new Date().toISOString();
      const response = await fetch(
        "https://crypto.develotion.com/transacciones.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: apiKey,
          },
          body: JSON.stringify(transaccion),
        }
      );

      const data = await response.json();
      if (!response.ok || data.codigo !== 200) {
        return rejectWithValue(data.mensaje || "Error al crear la transacción.");
      }

      return {
        ...transaccion,
        idTransaccion: data.idTransaccion || new Date().getTime(),
        fecha: fechaCreacion,
      };
    } catch (error) {
      return rejectWithValue("Error de conexión: " + error.message);
    }
  }
);

//obtener las transacciones
export const fetchTransacciones = createAsyncThunk(
  "transacciones/fetchTransacciones",
  async ({ idUsuario, apiKey }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://crypto.develotion.com/transacciones.php?idUsuario=${idUsuario}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            apikey: apiKey,
          },
        }
      );

      const data = await response.json();
      console.log("Transacciones obtenidas de la API:", data.transacciones);

      if (response.ok && data.codigo === 200) {
        return data.transacciones.map((transaccion) => ({
          ...transaccion,
          fecha: transaccion.fecha || new Date().toISOString(),
        }));
      } else {
        return rejectWithValue(data.mensaje || "Error al obtener transacciones.");
      }
    } catch (error) {
      return rejectWithValue("Error de conexión: " + error.message);
    }
  }
);

const transaccionesSlice = createSlice({
  name: "transacciones",
  initialState: {
    lista: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(crearTransaccion.fulfilled, (state, action) => {
        console.log("Transacción creada:", action.payload);
        state.lista.push(action.payload);
        AsyncStorage.setItem("transacciones", JSON.stringify(state.lista));
      })
      .addCase(fetchTransacciones.fulfilled, (state, action) => {
        console.log("Transacciones obtenidas:", action.payload);
        state.lista = action.payload;
        AsyncStorage.setItem("transacciones", JSON.stringify(state.lista));
      });
  },
});

export default transaccionesSlice.reducer;
