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
  id: number;
  current: number;
  select: React.Dispatch<React.SetStateAction<number>>;
}

const SidebarGroupItem = ({
  subject,
  id,
  current,
  select,
}: ISidebarGroupItemProps) => {
  const currSubject = useSelector(
    (state: RootState) => state.currSubject.subject
  );
  const currCourse = useSelector((state: RootState) => state.currCourse.course);

  const [courseList, setCourseList] = useState<Course[]>([]);
  const dispatch = useDispatch();

  const isSelected = current === id;

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

  const changeSubject = () => {
    if (currSubject?.id != subject.id) dispatch(setCurrCourse(null));
    dispatch(setCurrSubject(subject));
  };

  const onClickHandler = () => {
    if (isSelected) {
      select(-1);
    } else {
      select(id);
    }
    changeSubject();
  };

  return (
    <li className={`SidebarGroupItem ${isSelected ? "selected" : ""}`}>
      <button onClick={onClickHandler}>
        <div className="SidebarGroupItemContainer">
          <span>{subject.name}</span>
          <MdOutlineKeyboardArrowUp
            className="icon"
            style={{ minWidth: "20px", minHeight: "20px" }}
          />
        </div>
      </button>

      <div className={`SidebarItemsContainer ${isSelected ? "show" : ""}`}>
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
