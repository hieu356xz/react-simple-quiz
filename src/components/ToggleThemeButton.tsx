import { CgDarkMode } from "react-icons/cg";
import { ThemeContext } from "../contexts/ThemeProvider";
import { useContext } from "react";
import { saveThemeToLocal } from "../contexts/ThemeLocalStorage";

const ToggleThemeButton = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const changeTheme = () => {
    if (theme == "dark") {
      setTheme(() => {
        let curr = "light";
        saveThemeToLocal(curr);
        return curr;
      });
    } else {
      setTheme(() => {
        let curr = "dark";
        saveThemeToLocal(curr);
        return curr;
      });
    }
  };

  return (
    <button className="BtnToggleTheme" onClick={changeTheme}>
      <span>{theme}</span>
      <CgDarkMode size={"30px"} />
    </button>
  );
};

export default ToggleThemeButton;
