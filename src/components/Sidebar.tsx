import { SidebarOpenContext } from "../contexts/SidebarOpenProvider";
import { useContext, useEffect, useState } from "react";
import SidebarGroupItem from "./SidebarGroupItem";
import QueryDb from "../data/QueryDb";
import Subject from "../data/Subject";

const Sidebar = () => {
  const { isSidebarOpen } = useContext(SidebarOpenContext);
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
