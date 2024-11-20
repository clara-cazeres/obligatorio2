// features/monedasSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunk para obtener las monedas
export const fetchMonedas = createAsyncThunk(
  "monedas/fetchMonedas",
  async (_, { getState, rejectWithValue }) => {
    const { apiKey } = getState().usuario;
    try {
      const response = await fetch("https://crypto.develotion.com/monedas.php", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          apikey: apiKey,
        },
      });
      const data = await response.json();
      console.log(data)
      if (response.ok && data.codigo === 200) {
        return data.monedas;
      } else {
        return rejectWithValue(data.mensaje || "Error al obtener monedas.");
      }
    } catch (error) {
      return rejectWithValue("Error de conexión: " + error.message);
    }
  }
);

const monedasSlice = createSlice({
  name: "monedas",
  initialState: {
    lista: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMonedas.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchMonedas.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.lista = action.payload;
      })
      .addCase(fetchMonedas.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default monedasSlice.reducer;
