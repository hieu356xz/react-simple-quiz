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
    setIsItemSelected(currSubject?.id == props.subject.id);
  }, [currSubject]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await QueryDb(
        `select *
        from Course
        where subject_id = ${props.subject.id}`
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
    if (currSubject?.id != props.subject.id) dispatch(setCurrCourse(null));
    dispatch(setCurrSubject(props.subject));
  };

  return (
    <li className={`SidebarGroupItem ${isItemSelected ? "selected" : ""}`}>
      <button onClick={changeSubject}>
        <div className="SidebarGroupItemContainer">
          <span>{props.subject.name}</span>
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
                {course.name}
              </SidebarItem>
            );
          })}
        </ul>
      </div>
    </li>
  );
};

export default SidebarGroupItem;
