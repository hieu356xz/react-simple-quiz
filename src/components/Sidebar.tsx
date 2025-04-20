import { useEffect, useState } from "react";
import SidebarGroupItem from "./SidebarGroupItem";
import QueryDb from "../data/QueryDb";
import Subject from "../data/Subject";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import LoadingView from "./LoadingView";
import { toggleSidebar } from "../redux/SidebarOpenSlice";

const Sidebar = () => {
  const isSidebarOpen = useSelector(
    (state: RootState) => state.sidebarOpen.sidebarOpen
  );
  const [selectedItem, setSelectedItem] = useState(0);
  const [subjects, setSubjects] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const data = await QueryDb("select * from Subject");
      setSubjects(JSON.parse(data));
    };

    fetchData();
  }, []);

  return (
    <div className={`Sidebar ${isSidebarOpen ? "" : "hide"}`}>
      {!subjects || subjects.length == 0 ? (
        <LoadingView />
      ) : (
        <ul>
          {subjects.map((subject: Subject, index) => {
            return (
              <SidebarGroupItem
                subject={subject}
                id={index}
                current={selectedItem}
                select={setSelectedItem}
                key={index}
              />
            );
          })}
        </ul>
      )}
      <div
        className="SidebarOverlay"
        onClick={() => dispatch(toggleSidebar())}></div>
    </div>
  );
};

export default Sidebar;
