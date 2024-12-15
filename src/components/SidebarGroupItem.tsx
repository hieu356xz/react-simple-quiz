import { useEffect, useState } from "react";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import Subject from "../data/Subject";
import Course from "../data/Course";
import QueryDb from "../data/QueryDb";
import SidebarItem from "./SidebarItem";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setCurrSubject } from "../redux/CurrSubjectSlice";
import { setCurrCourse } from "../redux/CurrCourseSlice";

interface ISidebarGroupItemProps {
  subject: Subject;
}

const SidebarGroupItem = (props: ISidebarGroupItemProps) => {
  const currSubject = useSelector(
    (state: RootState) => state.currSubject.subject
  );
  const currCourse = useSelector((state: RootState) => state.currCourse.course);

  const [isItemSelected, setIsItemSelected] = useState(false);
  const [courseList, setCourseList] = useState<Course[]>([]);
  const dispatch = useDispatch();

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
    if (currSubject?.ID != props.subject.ID) dispatch(setCurrCourse(null));
    dispatch(setCurrSubject(props.subject));
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
              <SidebarItem key={index} currCourse={currCourse} course={course}>
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
