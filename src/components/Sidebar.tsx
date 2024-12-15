import { useEffect, useState } from "react";
import SidebarGroupItem from "./SidebarGroupItem";
import QueryDb from "../data/QueryDb";
import Subject from "../data/Subject";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Sidebar = () => {
  const isSidebarOpen = useSelector(
    (state: RootState) => state.sidebarOpen.sidebarOpen
  );
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await QueryDb("select * from Subjects");
      setSubjects(JSON.parse(data));
    };

    fetchData();
  }, []);

  return (
    <div className={`Sidebar ${isSidebarOpen ? "" : "hide"}`}>
      <ul>
        {subjects.map((subject: Subject, index) => {
          return <SidebarGroupItem subject={subject} key={index} />;
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
