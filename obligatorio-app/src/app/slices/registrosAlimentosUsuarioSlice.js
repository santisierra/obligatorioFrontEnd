import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  registros: [],
  filteredRegistros: [],
  registrosUltimaSemana: [],
  caloriasPorDia: {}, // Objeto para almacenar las calorías consumidas por día

}; 

export const registrosSlice = createSlice({
  name: "registrosSlice",
  initialState: initialState,
  reducers: {
    onLoadRegistros: (state, action) => {
      const { payload } = action;
      state.registros = payload;
      state.filteredRegistros = payload;
      state.registrosUltimaSemana = filtrarRegistrosUltimaSemana(payload);

    },
    onAddRegistro: (state, action) => {
      const { payload } = action;
      state.registros = [...state.registros, payload];
      state.filteredRegistros = state.registros;
  //    state.registrosUltimaSemana = filtrarRegistrosUltimaSemana(payload);

    },
    onRemoveRegistro: (state, action) => {
      const { payload } = action;
      state.registros = state.registros.filter(registro => registro.id !== payload.idRegistro);
      state.filteredRegistros = state.filteredRegistros.filter(registro => registro.id !== payload.idRegistro);
      state.registrosUltimaSemana = state.registrosUltimaSemana.filter(registro => registro.id !== payload.idRegistro);

    },
    
    onFilterRegistros: (state, action) => {
      const { payload } = action;
      const { registros } = state;
      if (payload === 0) {
        state.filteredRegistros = registros;
      } else if (payload === 1) {

        state.filteredRegistros = filtrarRegistrosUltimaSemana(registros);
 
      } else {
        // mes anterior
        const mesAnterior = new Date();
        mesAnterior.setMonth(mesAnterior.getMonth() - 1);
        state.filteredRegistros = registros.filter((registro) => new Date(registro.fecha) >= mesAnterior);
        
      }
    },
  },
});

// Función para filtrar los registros de la última semana
const filtrarRegistrosUltimaSemana = (registros) => {
  if (Array.isArray(registros)) {
    const unaSemanaAtras = new Date();
    unaSemanaAtras.setDate(unaSemanaAtras.getDate() - 7);
    return registros.filter((registro) => new Date(registro.fecha) >= unaSemanaAtras);
  } else {
    // Si registros no es un array, devolver un array vacío o manejar el caso según tu lógica
    return [];
  }
};


export const { onLoadRegistros, onAddRegistro, onFilterRegistros, onRemoveRegistro } = registrosSlice.actions;
export default registrosSlice.reducer;
