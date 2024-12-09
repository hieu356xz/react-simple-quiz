import { ThemeContext } from "../contexts/ThemeProvider";
import { useContext } from "react";
import { saveThemeToLocal } from "../contexts/ThemeLocalStorage";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

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
      {theme == "light" ? (
        <MdOutlineLightMode size={"24px"} style={{ background: "#00000000" }} />
      ) : (
        <MdOutlineDarkMode size={"24px"} style={{ background: "#00000000" }} />
      )}
    </button>
  );
};

export default ToggleThemeButton;
