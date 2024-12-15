import { configureStore } from "@reduxjs/toolkit";
import ThemeReducer from "./ThemeSlice";
import SidebarOpenReducer from "./SidebarOpenSlice";
import CurrSubjectReducer from "./CurrSubjectSlice";

const store = configureStore({
  reducer: {
    theme: ThemeReducer,
    sidebarOpen: SidebarOpenReducer,
    currSubject: CurrSubjectReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
