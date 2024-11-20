import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cuenta: 0
}

export const contadorSlice = createSlice({
    name:"contador",
    initialState,
    reducers:{
        incrementarCuenta: state =>{
            state.cuenta++;
        }
    }
})

export const {incrementarCuenta} = contadorSlice.actions;
export default contadorSlice.reducer;