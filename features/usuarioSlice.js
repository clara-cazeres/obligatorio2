import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Importar AsyncStorage

const initialState = {
  logueado: false,
  apiKey: null,
  username: null,
  idUsuario: null,
};

export const usuarioSlice = createSlice({
  name: "usuario",
  initialState,
  reducers: {
    loguear: (state, action) => {
      state.logueado = true;
      state.apiKey = action.payload.apiKey;
      state.username = action.payload.username;
      state.idUsuario = action.payload.idUsuario;

      // guardar en AsyncStorage
      AsyncStorage.setItem("apiKey", action.payload.apiKey);
      AsyncStorage.setItem("username", action.payload.username);
      AsyncStorage.setItem("idUsuario", action.payload.idUsuario.toString());
    },
    desloguear: (state) => {
      state.logueado = false;
      state.apiKey = null;
      state.username = null;
      state.idUsuario = null;

      // limpiar datos al cerrar sesión
      AsyncStorage.removeItem("apiKey");
      AsyncStorage.removeItem("username");
      AsyncStorage.removeItem("idUsuario");
    },
  },
});

export const { loguear, desloguear } = usuarioSlice.actions;
export default usuarioSlice.reducer;
