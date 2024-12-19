import { ReactNode } from "react";

interface INavbarItemProps {
  children: ReactNode;
  className?: string;
}

const NavbarItem = ({ children, ...props }: INavbarItemProps) => {
  return (
    <div className={`NavbarItem ${props.className ? props.className : ""}`}>
      {children}
    </div>
  );
};

export default NavbarItem;
