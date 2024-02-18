import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  alimentos: [],
};

export const aliemtosSlice = createSlice({
  name: "alimentosSlice",
  initialState: initialState,
  reducers: {
    onLoadAlimentos: (state, action) => {
      const { payload } = action;
      state.alimentos = payload;
    },
  },
});

export const { onLoadAlimentos  } = aliemtosSlice.actions;
export default aliemtosSlice.reducer;
