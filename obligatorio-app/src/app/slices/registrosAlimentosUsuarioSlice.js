import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  registros: [],
  filteredRegistros: [],
};

export const registrosSlice = createSlice({
  name: "registrosSlice",
  initialState: initialState,
  reducers: {
    onLoadRegistros: (state, action) => {
      const { payload } = action;
      state.registros = payload;
      state.filteredRegistros = payload;
    },
    onAddRegistro: (state, action) => {
      const { payload } = action;
      state.registros = [...state.registros, payload];
      state.filteredRegistros = state.registros;
    },
    onFilterRegistros: (state, action) => {
      const { payload } = action;
      const { registros } = state;
      if (payload === 0) {
        state.filteredRegistros = registros;
      } else if (payload === 1) {
        // semana anterior
        const semanaAnterior = new Date();
        semanaAnterior.setDate(semanaAnterior.getDate() - 7);
        state.filteredRegistros = registros.filter((registro) => new Date(registro.fecha) >= semanaAnterior);
 
      } else {
        // mes anterior
        const mesAnterior = new Date();
        mesAnterior.setMonth(mesAnterior.getMonth() - 1);
        state.filteredRegistros = registros.filter((registro) => new Date(registro.fecha) >= mesAnterior);
  
      }
    },
  },
});

export const { onLoadRegistros, onAddRegistro, onFilterRegistros } = registrosSlice.actions;
export default registrosSlice.reducer;
