import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import TestInfo from "../components/TestInfo";
import SidebarOpenProvider from "../contexts/SidebarOpenProvider";

const HomePage = () => {
  return (
    <SidebarOpenProvider>
      <Navbar />
      <div className="Main">
        <Sidebar />
        <TestInfo />
      </div>
    </SidebarOpenProvider>
  );
};

export default HomePage;
