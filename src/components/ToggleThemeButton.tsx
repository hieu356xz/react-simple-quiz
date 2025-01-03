import { useDispatch, useSelector } from "react-redux";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { RootState } from "../redux/store";
import { switchTheme } from "../redux/ThemeSlice";

const ToggleThemeButton = () => {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const dispatch = useDispatch();

  return (
    <button
      className="BtnToggleTheme IconBtn"
      onClick={() => dispatch(switchTheme())}
    >
      {theme == "light" ? (
        <MdOutlineLightMode size={"24px"} style={{ background: "#00000000" }} />
      ) : (
        <MdOutlineDarkMode size={"24px"} style={{ background: "#00000000" }} />
      )}
    </button>
  );
};

export default ToggleThemeButton;
