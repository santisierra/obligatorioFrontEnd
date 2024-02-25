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
      } else if (payload === 2){
        state.filteredRegistros = filtrarRegistrosUltimoMes(registros);
      }
    },
  },
});

// Función para filtrar los registros de la última semana
const filtrarRegistrosUltimaSemana = (registros) => {
  if (Array.isArray(registros)) {

    const unaSemanaAtras = new Date();
    unaSemanaAtras.setDate(unaSemanaAtras.getDate() - 7);
    const registrosFiltrados = registros.filter((registro) => new Date(registro.fecha) >= unaSemanaAtras);
    return registrosFiltrados;

  } else {
    // Si registros no es un array, devolver un array vacío o manejar el caso según tu lógica
    return [];
  }
};

const filtrarRegistrosUltimoMes = (registros) => {
  if (Array.isArray(registros)) {
    const hoy = new Date();
    let lastYear = hoy.getFullYear();
    let lastMonth = hoy.getMonth();

    // Manejar el caso especial de enero
    if (lastMonth === 0) {
      lastMonth = 11; // Diciembre del año anterior
      lastYear--;     // Año anterior
    } else {
      lastMonth--;    // Mes anterior
    }

    // Calcular el primer día del mes actual y del mes anterior
    const primerDiaMesActual = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
    const primerDiaMesAnterior = new Date(lastYear, lastMonth, 1);

    // Filtrar los registros para el mes anterior
    const registrosFiltrados = registros.filter((registro) => {
      const fechaRegistro = new Date(registro.fecha);
      return fechaRegistro >= primerDiaMesAnterior && fechaRegistro < primerDiaMesActual;
    });

    return registrosFiltrados;
  } else {
    return [];
  }
};


export const { onLoadRegistros, onAddRegistro, onFilterRegistros, onRemoveRegistro } = registrosSlice.actions;
export default registrosSlice.reducer;
