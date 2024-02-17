import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import todosSlice from "./slices/todosSlice";
export const store = configureStore({
  reducer: {
    userSlice: userSlice,
    todosSlice: todosSlice,
  },
});
