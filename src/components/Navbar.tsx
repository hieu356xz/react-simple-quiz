import { useContext, useEffect, useState } from "react";
import { FaBars, FaAngleRight } from "react-icons/fa6";
import NavbarItem from "./NavbarItem";
import { CurrSubjectContext } from "../contexts/CurrSubjectProvider";
import ToggleThemeButton from "./ToggleThemeButton";

const Navbar = (props: any) => {
  const { currSubject } = useContext(CurrSubjectContext);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    setIsButtonDisabled(() => true);
    setTimeout(() => setIsButtonDisabled(() => false), 350);
  }, [props.isSidebarOpen]);

  return (
    <nav className="Navbar">
      <NavbarItem>
        <button
          className="BtnHamburger"
          onClick={props.toggleSidebar}
          disabled={isButtonDisabled}
        >
          <FaBars
            className={`BtnHamburgerIcon ${
              props.isSidebarOpen ? "active" : ""
            }`}
            style={{ backgroundColor: "#00000000" }}
          />
        </button>
      </NavbarItem>

      <NavbarItem>
        <span>Môn học</span>
      </NavbarItem>

      <NavbarItem>
        <FaAngleRight color="var(--secondary-text-color)" />
      </NavbarItem>

      <NavbarItem>
        <span>{currSubject && currSubject.Name}</span>
      </NavbarItem>

      <NavbarItem>
        <ToggleThemeButton />
      </NavbarItem>
    </nav>
  );
};

export default Navbar;
