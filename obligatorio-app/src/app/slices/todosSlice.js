import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toDos: [],
  filteredToDos: [],
};

export const todosSlice = createSlice({
  name: "todosSlice",
  initialState: initialState,
  reducers: {
    onLoadToDos: (state, action) => {
      const { payload } = action;
      state.toDos = payload;
      state.filteredToDos = payload;
    },
    onAddToDo: (state, action) => {
      const { payload } = action;
      state.toDos = [...state.toDos, payload];
      state.filteredToDos = state.toDos;
    },
    onFilterToDos: (state, action) => {
      const { payload } = action;
      const { toDos } = state;
      if (payload === 0) {
        // No completados
        state.filteredToDos = toDos.filter((todo) => !todo.completed);
      } else if (payload === 1) {
        // Completados
        state.filteredToDos = toDos.filter((todo) => todo.completed);
      } else {
        // Todos
        state.filteredToDos = toDos;
      }
    },
  },
});

export const { onLoadToDos, onAddToDo, onFilterToDos } = todosSlice.actions;
export default todosSlice.reducer;
