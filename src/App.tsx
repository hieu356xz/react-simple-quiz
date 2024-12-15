import HomePage from "./pages/HomePage";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";

const App = () => {
  const theme = useSelector((state: RootState) => state.theme.theme);

  return (
    <div className="App" data-theme={theme}>
      <HomePage />
    </div>
  );
};

export default App;
