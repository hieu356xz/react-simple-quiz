import { configureStore } from "@reduxjs/toolkit";
import ThemeReducer from "./ThemeSlice";

const store = configureStore({
  reducer: {
    theme: ThemeReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
