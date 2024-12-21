import HomePage from "./pages/HomePage";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { useEffect } from "react";
import { setCurrSubject } from "./redux/CurrSubjectSlice";
import QueryDb from "./data/QueryDb";
import Subject from "./data/Subject";
import TestPage from "./pages/TestPage";

const App = () => {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const activeTest = useSelector(
    (state: RootState) => state.activeTest.activeTest
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchDefaultSubject = async () => {
      try {
        const data = await QueryDb(
          `select *
            from Subject 
            where semester_id = (select id 
                                from Semester 
                                where id = 6)
            limit 1`
        );

        const subject = new Subject(JSON.parse(data)[0]);
        dispatch(setCurrSubject(subject));
      } catch (error) {
        console.error("Error fetching data:", error);
        return null;
      }
    };

    fetchDefaultSubject();
  }, []);

  return (
    <div className="App" data-theme={theme}>
      {activeTest ? <TestPage /> : <HomePage />}
    </div>
  );
};

export default App;
