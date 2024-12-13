import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import CurrSubjectProvider from "./contexts/CurrSubjectProvider";
import CurrTestProvider from "./contexts/CurrTestProvider";
import ThemeProvider, { ThemeContext } from "./contexts/ThemeProvider";
import { useContext } from "react";

const router = createBrowserRouter(
  createRoutesFromElements(<Route index element={<HomePage />}></Route>)
);

const App = () => {
  return (
    <ThemeProvider>
      <CurrSubjectProvider>
        <CurrTestProvider>
          <AppContent />
        </CurrTestProvider>
      </CurrSubjectProvider>
    </ThemeProvider>
  );
};

const AppContent = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="App" data-theme={theme}>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
