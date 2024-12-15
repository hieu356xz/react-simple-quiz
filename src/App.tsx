import HomePage from "./pages/HomePage";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { useEffect } from "react";
import { setCurrSubject } from "./redux/CurrSubjectSlice";
import QueryDb from "./data/QueryDb";
import Subject from "./data/Subject";

const App = () => {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchDefaultSubject = async () => {
      try {
        const data = await QueryDb(
          `select *
            from Subjects 
            where SemesterID = (select ID 
                                from Semesters 
                                where ID = 6)
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
      <HomePage />
    </div>
  );
};

export default App;
