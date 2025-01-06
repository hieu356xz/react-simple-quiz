import HomePage from "./pages/HomePage";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import TestPage from "./pages/TestPage";

const App = () => {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const activeTest = useSelector(
    (state: RootState) => state.activeTest.activeTest
  );

  return (
    <div className="App" data-theme={theme}>
      {activeTest ? <TestPage /> : <HomePage />}
    </div>
  );
};

export default App;
