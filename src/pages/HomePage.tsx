import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import TestInfo from "../components/TestInfo";

const HomePage = () => {
  const [isSidebarOpen, setIsSidenbarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidenbarOpen((prev) => !prev);
  };

  return (
    <>
      <Navbar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="Main">
        <Sidebar isSidebarOpen={isSidebarOpen} />
        <TestInfo isSidebarOpen={isSidebarOpen} />
      </div>
    </>
  );
};

export default HomePage;
