import HomePage from "./pages/HomePage";
import CurrSubjectProvider from "./contexts/CurrSubjectProvider";
import CurrCourseProvider from "./contexts/CurrCourseProvider";
import ThemeProvider, { ThemeContext } from "./contexts/ThemeProvider";
import { useContext } from "react";

const App = () => {
  return (
    <ThemeProvider>
      <CurrSubjectProvider>
        <CurrCourseProvider>
          <AppContent />
        </CurrCourseProvider>
      </CurrSubjectProvider>
    </ThemeProvider>
  );
};

const AppContent = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="App" data-theme={theme}>
      <HomePage />
    </div>
  );
};

export default App;
