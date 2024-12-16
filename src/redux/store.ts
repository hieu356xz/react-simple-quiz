import { configureStore } from "@reduxjs/toolkit";
import ThemeReducer from "./ThemeSlice";
import SidebarOpenReducer from "./SidebarOpenSlice";
import CurrSubjectReducer from "./CurrSubjectSlice";
import CurrCourseReducer from "./CurrCourseSlice";
import ActiveTestReducer from "./ActiveTestSlice";

const store = configureStore({
  reducer: {
    theme: ThemeReducer,
    sidebarOpen: SidebarOpenReducer,
    currSubject: CurrSubjectReducer,
    currCourse: CurrCourseReducer,
    activeTest: ActiveTestReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
