import HomePage from "./pages/HomePage";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "./redux/store";
import TestPage from "./pages/TestPage";
import { loadCurrCourse } from "./redux/CurrCourseSlice";
import { loadCurrSubject } from "./redux/CurrSubjectSlice";
import { loadCurrSemester } from "./redux/CurrSemesterSlice";
import { useEffect } from "react";
import SQLDatabase from "./data/SQLDatabase";
import SQL from "sql.js/dist/sql-wasm.js";

const App = () => {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const activeTest = useSelector(
    (state: RootState) => state.activeTest.activeTest
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    let instance: SQL.Database | null = null;
    const initializeDatabase = async () => {
      try {
        instance = await SQLDatabase.getInstance(); // Initialize the database

        dispatch(loadCurrSubject());
        dispatch(loadCurrCourse());
        dispatch(loadCurrSemester());
      } catch (error) {
        console.error("Error initializing database:", error);
      }
    };

    initializeDatabase();

    return () => {
      if (instance) {
        instance.close();
      }
    };
  }, []);

  return (
    <div className="App" data-theme={theme}>
      {activeTest ? <TestPage /> : <HomePage />}
    </div>
  );
};

export default App;
