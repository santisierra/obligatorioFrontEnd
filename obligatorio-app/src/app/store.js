import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import todosSlice from "./slices/todosSlice";
import registrosSlice from "./slices/registrosAlimentosUsuarioSlice";
import alimetosSlice from "./slices/alimentosSlice";
export const store = configureStore({
  reducer: {
    userSlice: userSlice,
    todosSlice: todosSlice,
    registrosSlice:registrosSlice,
    alimetosSlice:alimetosSlice,
  },
});
