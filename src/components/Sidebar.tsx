import { SidebarOpenContext } from "../contexts/SidebarOpenProvider";
import { useContext } from "react";

const Sidebar = () => {
  const { isSidebarOpen } = useContext(SidebarOpenContext);

  return (
    <div className={`Sidebar ${isSidebarOpen ? "" : "hide"}`}>Sidebar</div>
  );
};

export default Sidebar;
