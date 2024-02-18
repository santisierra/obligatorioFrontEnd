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
      state.registros = [...state.registrosSlice, payload];
      state.filteredRegistros = state.registrosSlice;
    },
    onFilterRegistros: (state, action) => {
      const { payload } = action;
      const { registros } = state;
      /*if (payload === 0) {
        // No completados
        state.filteredRegistros = registros.filter((todo) => !todo.completed);
      } else if (payload === 1) {
        // Completados
        state.filteredRegistros = registros.filter((todo) => todo.completed);
      } else {
        // Todos
        state.filteredRegistros = registros;
      }*/
    },
  },
});

export const { onLoadRegistros, onAddRegistro, onFilterRegistros } = registrosSlice.actions;
export default registrosSlice.reducer;
