import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import CourseInfo from "../components/CourseInfo";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <div className="Main">
        <Sidebar />
        <CourseInfo />
      </div>
    </>
  );
};

export default HomePage;
