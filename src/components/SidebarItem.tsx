import { ReactNode, useEffect, useState } from "react";
import { PiDotOutlineFill } from "react-icons/pi";
import Course from "../data/Course";

interface ISidebarItemProps {
  children: ReactNode;
  currCourse: Course | null;
  setCurrCourse: React.Dispatch<React.SetStateAction<Course | null>>;
  course: Course;
}

const SidebarItem = ({ children, ...props }: ISidebarItemProps) => {
  const [isItemSelected, setIsItemSelected] = useState(false);

  useEffect(() => {
    props.currCourse
      ? setIsItemSelected(props.currCourse.ID == props.course.ID)
      : setIsItemSelected(false);
  }, [props.currCourse]);

  return (
    <li className={`SidebarItem ${isItemSelected ? "selected" : ""}`}>
      <button onClick={() => props.setCurrCourse(props.course)}>
        <PiDotOutlineFill strokeWidth={"70px"} className="icon" /> {children}
      </button>
    </li>
  );
};

export default SidebarItem;
