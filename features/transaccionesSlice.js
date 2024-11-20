import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const crearTransaccion = createAsyncThunk(
  "transacciones/crearTransaccion",
  async (transaccion, { getState }) => {
    const { apiKey } = getState().usuario;
    const response = await fetch("https://crypto.develotion.com/transacciones.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: apiKey,
      },
      body: JSON.stringify(transaccion),
    });

    const data = await response.json();

    if (!response.ok || data.codigo !== 200) {
      throw new Error(data.mensaje || "Error al crear la transacción");
    }

    return {
      ...transaccion,
      idTransaccion: data.idTransaccion, // Confirmar este campo en la respuesta
    };
  }
);

const transaccionesSlice = createSlice({
  name: "transacciones",
  initialState: {
    lista: [],
    status: "idle", // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(crearTransaccion.pending, (state) => {
        state.status = "loading";
      })
      .addCase(crearTransaccion.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.lista.push(action.payload); // Agregar la nueva transacción a la lista
      })
      .addCase(crearTransaccion.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default transaccionesSlice.reducer;
