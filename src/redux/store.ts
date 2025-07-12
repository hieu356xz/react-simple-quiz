import { configureStore } from "@reduxjs/toolkit";
import ThemeReducer from "./ThemeSlice";
import SidebarOpenReducer from "./SidebarOpenSlice";
import CurrSubjectReducer from "./CurrSubjectSlice";
import CurrCourseReducer from "./CurrCourseSlice";
import ActiveTestReducer from "./ActiveTestSlice";
import TestQuestionReducer from "./TestQuestionSlice";
import UserAnswerReducer from "./UserAnswerSlice";
import TestResultReducer from "./TestResultSlice";
import { useDispatch } from "react-redux";
import TestConfigReducer from "./TestConfigSlice";
import testNavigationReducer from "./testNavigationSlice";
import CurrSemesterReducer from "./CurrSemesterSlice";

const store = configureStore({
  reducer: {
    theme: ThemeReducer,
    sidebarOpen: SidebarOpenReducer,
    currSubject: CurrSubjectReducer,
    currCourse: CurrCourseReducer,
    currSemester: CurrSemesterReducer,
    activeTest: ActiveTestReducer,
    testQuestion: TestQuestionReducer,
    userAnswer: UserAnswerReducer,
    testResult: TestResultReducer,
    testConfig: TestConfigReducer,
    testNavigation: testNavigationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
