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
import AnimateHeight from "react-animate-height";

interface ISidebarGroupItemProps {
  subject: Subject;
}

const SidebarGroupItem = ({ subject }: ISidebarGroupItemProps) => {
  const currSubject = useSelector(
    (state: RootState) => state.currSubject.subject
  );
  const currCourse = useSelector((state: RootState) => state.currCourse.course);

  const [isSelected, setIsSelected] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [courseList, setCourseList] = useState<Course[]>([]);

  const className = `SidebarGroupItem ${isSelected ? "selected" : ""} ${
    isExpanded ? "expanded" : ""
  }`;
  const dispatch = useDispatch();

  useEffect(() => {
    setIsSelected(currSubject?.id === subject.id);
    setIsExpanded(currSubject?.id === subject.id);
  }, [currSubject]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await QueryDb(
        `select *
        from Course
        where subject_id = ${subject.id}`
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

  const onChangeSubjectHanlder = () => {
    // If current course not in current subject then reset
    if (currSubject?.id !== subject.id) dispatch(setCurrCourse(null));

    dispatch(setCurrSubject(subject));
    setIsExpanded((prev) => !prev);
  };

  return (
    <li className={className}>
      <button onClick={onChangeSubjectHanlder}>
        <div className="SidebarGroupItemContainer">
          <span>{subject.name}</span>
          <MdOutlineKeyboardArrowUp
            className="icon"
            style={{ minWidth: "20px", minHeight: "20px" }}
          />
        </div>
      </button>

      <AnimateHeight
        height={isExpanded ? "auto" : 0}
        duration={300}
        className={"SidebarItemsContainer"}>
        <ul>
          {courseList.map((course, index) => {
            return (
              <SidebarItem key={index} currCourse={currCourse} course={course}>
                {course.name}
              </SidebarItem>
            );
          })}
        </ul>
      </AnimateHeight>
    </li>
  );
};

export default SidebarGroupItem;
