import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import registrosSlice from "./slices/registrosAlimentosUsuarioSlice";
import alimetosSlice from "./slices/alimentosSlice";
export const store = configureStore({
  reducer: {
    userSlice: userSlice,
    registrosSlice:registrosSlice,
    alimetosSlice:alimetosSlice,
  },
});
