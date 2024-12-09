import { useContext } from "react";
import { FaBars, FaAngleRight } from "react-icons/fa6";
import NavbarItem from "./NavbarItem";
import { CurrSubjectContext } from "../contexts/CurrSubjectProvider";
import ToggleThemeButton from "./ToggleThemeButton";

const Navbar = () => {
  const { currSubject } = useContext(CurrSubjectContext);

  return (
    <nav className="Navbar">
      <NavbarItem>
        <button className="BtnHamburger">
          <FaBars style={{ backgroundColor: "#00000000" }} />
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
