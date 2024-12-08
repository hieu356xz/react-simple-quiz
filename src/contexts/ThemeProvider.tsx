import { createContext, useState, ReactNode } from "react";
import { getThemeFromLocal } from "./ThemeLocalStorage";

interface IThemeContext {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<any>>;
}

const ThemeContext = createContext<IThemeContext>({
  theme: "",
  setTheme: () => {},
});

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState(getThemeFromLocal());

  return (
    <ThemeContext.Provider value={{ theme: theme, setTheme: setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext };
export default ThemeProvider;
