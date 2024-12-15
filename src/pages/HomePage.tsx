import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import CourseInfo from "../components/CourseInfo";
import SidebarOpenProvider from "../contexts/SidebarOpenProvider";

const HomePage = () => {
  return (
    <SidebarOpenProvider>
      <Navbar />
      <div className="Main">
        <Sidebar />
        <CourseInfo />
      </div>
    </SidebarOpenProvider>
  );
};

export default HomePage;
