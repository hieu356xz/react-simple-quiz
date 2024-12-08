import { ReactNode } from "react";

const NavbarItem = ({ children }: { children: ReactNode }) => {
  return <div className="NavbarItem">{children}</div>;
};

export default NavbarItem;
