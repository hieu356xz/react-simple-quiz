import HomePage from "./pages/HomePage";
import CurrCourseProvider from "./contexts/CurrCourseProvider";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";

const App = () => {
  return (
    <CurrCourseProvider>
      <AppContent />
    </CurrCourseProvider>
  );
};

const AppContent = () => {
  const theme = useSelector((state: RootState) => state.theme.theme);

  return (
    <div className="App" data-theme={theme}>
      <HomePage />
    </div>
  );
};

export default App;
