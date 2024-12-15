import { configureStore } from "@reduxjs/toolkit";
import ThemeReducer from "./ThemeSlice";
import SidebarOpenReducer from "./SidebarOpenSlice";

const store = configureStore({
  reducer: {
    theme: ThemeReducer,
    sidebarOpen: SidebarOpenReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
