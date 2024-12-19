import { useSelector } from "react-redux";
import NavbarItem from "./NavbarItem";
import { RootState } from "../redux/store";
import ToggleThemeButton from "./ToggleThemeButton";
import { FiEdit } from "react-icons/fi";
import { useMediaQuery } from "@react-hook/media-query";

const TestNavbar = () => {
  const currSubject = useSelector(
    (state: RootState) => state.currSubject.subject
  );

  const screenMatches = useMediaQuery("screen and (max-width: 768px)");

  return (
    <nav className="Navbar">
      <div className="TestNavbarContainer">
        {!screenMatches && (
          <NavbarItem>
            <span>{currSubject && currSubject?.Name}</span>
          </NavbarItem>
        )}
        <NavbarItem className="BtnSubmitTestContainer">
          <button className="BtnSubmitTest" onClick={() => {}}>
            <FiEdit
              className="icon"
              stroke="#e0e0e0"
              strokeWidth={3}
              size={"17px"}
              style={{ backgroundColor: "#00000000" }}
            />
            Nộp bài
          </button>
        </NavbarItem>
      </div>

      <NavbarItem>
        <ToggleThemeButton />
      </NavbarItem>
    </nav>
  );
};

export default TestNavbar;
