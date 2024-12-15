import { useContext, useEffect, useState } from "react";
import { useMediaQuery } from "@react-hook/media-query";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { CurrSubjectContext } from "../contexts/CurrSubjectProvider";
import { CurrCourseContext } from "../contexts/CurrCourseProvider";
import { SidebarOpenContext } from "../contexts/SidebarOpenProvider";
import Subject from "../data/Subject";
import Course from "../data/Course";
import QueryDb from "../data/QueryDb";
import SidebarItem from "./SidebarItem";

interface ISidebarGroupItemProps {
  subject: Subject;
}

const SidebarGroupItem = (props: ISidebarGroupItemProps) => {
  const { currSubject, setCurrSubject } = useContext(CurrSubjectContext);
  const { currCourse, setCurrCourse } = useContext(CurrCourseContext);
  const { setIsSidebarOpen } = useContext(SidebarOpenContext);

  const [isItemSelected, setIsItemSelected] = useState(false);
  const [courseList, setCourseList] = useState<Course[]>([]);

  const screenMatches = useMediaQuery("screen and (max-width: 768px)");

  useEffect(() => {
    setIsItemSelected(currSubject?.ID == props.subject.ID);
  }, [currSubject]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await QueryDb(
        `select *
        from Courses
        where SubjectID = ${props.subject.ID}`
      );

      const courseList: Course[] = JSON.parse(data).map(
        (course: Course) => new Course(course)
      );
      if (courseList) {
        setCourseList(courseList);
      }
    };

    fetchData();
  }, []);

  const changeSubject = () => {
    if (currSubject != props.subject) setCurrCourse(null);
    setCurrSubject(props.subject);
    // Tự động đóng sidebar trên màn hình nhỏ
    screenMatches && setIsSidebarOpen(false);
  };

  return (
    <li className={`SidebarGroupItem ${isItemSelected ? "selected" : ""}`}>
      <button onClick={changeSubject}>
        <div className="SidebarGroupItemContainer">
          <span>{props.subject.Name}</span>
          <MdOutlineKeyboardArrowUp
            className="icon"
            style={{ minWidth: "20px", minHeight: "20px" }}
          />
        </div>
      </button>

      <div className={`SidebarItemsContainer ${isItemSelected ? "show" : ""}`}>
        <ul>
          {courseList.map((course, index) => {
            return (
              <SidebarItem
                key={index}
                currCourse={currCourse}
                setCurrCourse={setCurrCourse}
                course={course}
              >
                {course.Name}
              </SidebarItem>
            );
          })}
        </ul>
      </div>
    </li>
  );
};

export default SidebarGroupItem;
