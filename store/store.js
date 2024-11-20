import { configureStore } from "@reduxjs/toolkit";
import usuarioReducer from "../features/usuarioSlice";
import monedasReducer from "../features/monedasSlice"; 
import transaccionesReducer from "../features/transaccionesSlice"; 
export const store = configureStore({
  reducer: {
    usuario: usuarioReducer,
    monedas: monedasReducer, 
    transacciones: transaccionesReducer, 
  },
});

export default store;
