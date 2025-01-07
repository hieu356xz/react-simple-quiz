import HomePage from "./pages/HomePage";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "./redux/store";
import TestPage from "./pages/TestPage";
import { loadCurrCourse } from "./redux/CurrCourseSlice";
import { loadCurrSubject } from "./redux/CurrSubjectSlice";
import { useEffect } from "react";

const App = () => {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const activeTest = useSelector(
    (state: RootState) => state.activeTest.activeTest
  );

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadCurrSubject());
    dispatch(loadCurrCourse());
  }, []);

  return (
    <div className="App" data-theme={theme}>
      {activeTest ? <TestPage /> : <HomePage />}
    </div>
  );
};

export default App;
