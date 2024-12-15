import { useContext, useEffect, useState } from "react";
import { FaBars, FaAngleRight } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "@react-hook/media-query";
import NavbarItem from "./NavbarItem";
import { CurrSubjectContext } from "../contexts/CurrSubjectProvider";
import ToggleThemeButton from "./ToggleThemeButton";
import { RootState } from "../redux/store";
import { toggleSidebar } from "../redux/SidebarOpenSlice";

const Navbar = () => {
  const { currSubject } = useContext(CurrSubjectContext);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const isSidebarOpen = useSelector(
    (state: RootState) => state.sidebarOpen.sidebarOpen
  );
  const screenMatches = useMediaQuery("screen and (max-width: 768px)");
  const dispatch = useDispatch();

  useEffect(() => {
    setIsButtonDisabled(() => true);
    setTimeout(() => setIsButtonDisabled(() => false), 350);
  }, [isSidebarOpen]);

  return (
    <nav className="Navbar">
      <NavbarItem>
        <button
          className="BtnHamburger"
          onClick={() => dispatch(toggleSidebar())}
          disabled={isButtonDisabled}
        >
          <FaBars
            className={`BtnHamburgerIcon ${isSidebarOpen ? "active" : ""}`}
            style={{ backgroundColor: "#00000000" }}
          />
        </button>
      </NavbarItem>

      {!screenMatches && (
        <>
          <NavbarItem>
            <span style={{ textWrap: "nowrap" }}>Môn học</span>
          </NavbarItem>

          <NavbarItem>
            <FaAngleRight color="var(--secondary-text-color)" />
          </NavbarItem>

          <NavbarItem>
            <span>{currSubject && currSubject.Name}</span>
          </NavbarItem>
        </>
      )}

      <NavbarItem>
        <ToggleThemeButton />
      </NavbarItem>
    </nav>
  );
};

export default Navbar;
