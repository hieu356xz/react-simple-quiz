import { configureStore } from "@reduxjs/toolkit";
import ThemeReducer from "./ThemeSlice";
import SidebarOpenReducer from "./SidebarOpenSlice";
import CurrSubjectReducer from "./CurrSubjectSlice";
import CurrCourseReducer from "./CurrCourseSlice";

const store = configureStore({
  reducer: {
    theme: ThemeReducer,
    sidebarOpen: SidebarOpenReducer,
    currSubject: CurrSubjectReducer,
    currCourse: CurrCourseReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
