import { ReactNode, useEffect, useState } from "react";
import { useMediaQuery } from "@react-hook/media-query";
import { useDispatch } from "react-redux";
import { PiDotOutlineFill } from "react-icons/pi";
import Course from "../data/Course";
import { setIsSidebarOpen } from "../redux/SidebarOpenSlice";

interface ISidebarItemProps {
  children: ReactNode;
  currCourse: Course | null;
  setCurrCourse: React.Dispatch<React.SetStateAction<Course | null>>;
  course: Course;
}

const SidebarItem = ({ children, ...props }: ISidebarItemProps) => {
  const [isItemSelected, setIsItemSelected] = useState(false);
  const dispatch = useDispatch();

  const screenMatches = useMediaQuery("screen and (max-width: 768px)");

  useEffect(() => {
    props.currCourse
      ? setIsItemSelected(props.currCourse.ID == props.course.ID)
      : setIsItemSelected(false);
  }, [props.currCourse]);

  const changeCourse = () => {
    props.setCurrCourse(props.course);
    // Tự động đóng sidebar trên màn hình nhỏ
    screenMatches && dispatch(setIsSidebarOpen(false));
  };

  return (
    <li className={`SidebarItem ${isItemSelected ? "selected" : ""}`}>
      <button onClick={changeCourse}>
        <PiDotOutlineFill strokeWidth={"70px"} className="icon" /> {children}
      </button>
    </li>
  );
};

export default SidebarItem;
