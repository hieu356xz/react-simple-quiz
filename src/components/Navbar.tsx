import { useContext, useEffect, useState } from "react";
import { FaBars, FaAngleRight } from "react-icons/fa6";
import NavbarItem from "./NavbarItem";
import { CurrSubjectContext } from "../contexts/CurrSubjectProvider";
import { SidebarOpenContext } from "../contexts/SidebarOpenProvider";
import ToggleThemeButton from "./ToggleThemeButton";
import { useMediaQuery } from "@react-hook/media-query";

const Navbar = () => {
  const { currSubject } = useContext(CurrSubjectContext);
  const { isSidebarOpen, setIsSidebarOpen } = useContext(SidebarOpenContext);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const screenMatches = useMediaQuery("screen and (min-width: 768px)");

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  useEffect(() => {
    setIsButtonDisabled(() => true);
    setTimeout(() => setIsButtonDisabled(() => false), 350);
  }, [isSidebarOpen]);

  return (
    <nav className="Navbar">
      <NavbarItem>
        <button
          className="BtnHamburger"
          onClick={toggleSidebar}
          disabled={isButtonDisabled}
        >
          <FaBars
            className={`BtnHamburgerIcon ${isSidebarOpen ? "active" : ""}`}
            style={{ backgroundColor: "#00000000" }}
          />
        </button>
      </NavbarItem>

      {screenMatches && (
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
